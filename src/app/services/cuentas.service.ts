import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Response } from '../../types/Response';
import {
  Correo,
  FechaNacimiento,
  Identificacion,
  NombreCompleto,
} from '../../types/Cuenta';
import { Router } from '@angular/router';
import { AlertsService } from './alerts.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class CuentasService {
  constructor(
    private router: Router,
    private alertsService: AlertsService,
    private sessionService: SessionService
  ) {}

  private _patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private _patronClave =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_.,:;!"#$%&/()=?¿¡{}[\]*+~\\|°<>])\S*$/;

  public get patronCorreo() {
    return this._patronCorreo;
  }

  public get patronClave() {
    return this._patronClave;
  }

  public calcularEdad(fechaNacimiento: string) {
    const fechaActual = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    let edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
    const diferenciaMeses =
      fechaActual.getMonth() - fechaNacimientoDate.getMonth();
    const diferenciaDias =
      fechaActual.getDate() - fechaNacimientoDate.getDate();
    if (diferenciaMeses < 0 || (diferenciaMeses == 0 && diferenciaDias <= 0)) {
      edad--;
    }
    return edad;
  }

  public async crear(
    tipoIdentificacion: string,
    numeroIdentificacion: string,
    primerNombre: string,
    segundoNombre: string | null,
    primerApellido: string,
    segundoApellido: string | null,
    fechaNacimiento: string,
    correo: string,
    clave: string
  ): Promise<boolean> {
    try {
      const cuenta = {
        tipoIdentificacion,
        numeroIdentificacion,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        fechaNacimiento,
        correo,
        clave,
      };

      const { data } = await axios.post<Response>(
        `${environment.apiKey}/cuentas/crear`,
        cuenta
      );

      if (!data.error) {
        this.alertsService.message('success', data.message);
        this.router.navigate(['/login']);
        return true;
      } else {
        this.alertsService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor. Inténtelo de nuevo más tarde.'
      );
      return false;
    }
  }

  public async iniciarSesion(
    tipoIdentificacion: string,
    numeroIdentificacion: string,
    clave: string
  ): Promise<boolean> {
    try {
      const cuenta = {
        tipoIdentificacion,
        numeroIdentificacion,
        clave,
      };

      const { data } = await axios.post<Response>(
        `${environment.apiKey}/cuentas/iniciar-sesion`,
        cuenta
      );

      if (!data.error) {
        this.alertsService.message('success', data.message);
        this.sessionService.guardarToken(data.body?.token);
        this.router.navigate(['/panel']);
        return true;
      } else {
        this.alertsService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor. Inténtelo de nuevo más tarde.'
      );
      return false;
    }
  }

  public async cerrarSesion(): Promise<boolean> {
    try {
      const token = this.sessionService.obtenerToken();

      const { data } = await axios.get<Response>(
        `${environment.apiKey}/cuentas/cerrar-sesion`,
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        this.alertsService.message('success', data.message);
        this.sessionService.borrarToken();
        this.router.navigate(['/']);
        return true;
      } else {
        this.alertsService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor. Inténtelo de nuevo más tarde.'
      );
      return false;
    }
  }

  public async verificarSesion(
    pagina: 'landing' | 'login-register' | 'panel'
  ): Promise<boolean> {
    try {
      const token = this.sessionService.obtenerToken();

      if (!!token) {
        const { data } = await axios.get<Response>(
          `${environment.apiKey}/cuentas/verificar-sesion`,
          { headers: { Authorization: token } }
        );

        if (!data.error && data.body.sesionValida) {
          if (pagina == 'login-register') {
            this.router.navigate(['/panel']);
          }
          return true;
        } else {
          if (pagina == 'panel') {
            this.alertsService.message(
              'error',
              'La sesión ha expirado. Inicie sesión nuevamente.'
            );
            this.router.navigate(['/login']);
          }
          return false;
        }
      } else {
        if (pagina == 'panel') {
          this.alertsService.message(
            'error',
            'Es necesario iniciar sesión para acceder a esta ruta.'
          );
          this.router.navigate(['/login']);
        }
        return false;
      }
    } catch (error) {
      if (pagina == 'panel') {
        this.alertsService.message(
          'error',
          'La sesión ha expirado. Inicie sesión nuevamente.'
        );
        this.router.navigate(['/login']);
      }
      return false;
    }
  }

  public async obtenerIdentificacion(): Promise<Identificacion | null> {
    try {
      const token = this.sessionService.obtenerToken();

      const { data } = await axios.get<Response>(
        `${environment.apiKey}/cuentas/obtener-identificacion`,
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.cuenta;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  public async obtenerNombre(): Promise<NombreCompleto | null> {
    try {
      const token = this.sessionService.obtenerToken();

      const { data } = await axios.get<Response>(
        `${environment.apiKey}/cuentas/obtener-nombre`,
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.cuenta;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  public async obtenerFechaNacimiento(): Promise<FechaNacimiento | null> {
    try {
      const token = this.sessionService.obtenerToken();

      const { data } = await axios.get<Response>(
        `${environment.apiKey}/cuentas/obtener-fecha-nacimiento`,
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.cuenta;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  public async obtenerCorreo(): Promise<Correo | null> {
    try {
      const token = this.sessionService.obtenerToken();

      const { data } = await axios.get<Response>(
        `${environment.apiKey}/cuentas/obtener-correo`,
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.cuenta;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  public async verificarClave(clave: string): Promise<boolean> {
    try {
      const token = this.sessionService.obtenerToken();

      const { data } = await axios.post<Response>(
        `${environment.apiKey}/cuentas/verificar-clave`,
        { clave },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.claveCorrecta;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  public async actualizarIdentificacion(
    tipoIdentificacion: string,
    numeroIdentificacion: string
  ): Promise<boolean> {
    try {
      const token = this.sessionService.obtenerToken();

      const { data } = await axios.put<Response>(
        `${environment.apiKey}/cuentas/actualizar-identificacion`,
        { tipoIdentificacion, numeroIdentificacion },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        this.alertsService.message('success', data.message);
        return data.body.cuentaActualizada;
      } else {
        this.alertsService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor. Inténtelo de nuevo más tarde.'
      );
      return false;
    }
  }

  public async actualizarNombre(
    primerNombre: string,
    segundoNombre: string | null,
    primerApellido: string,
    segundoApellido: string | null
  ): Promise<boolean> {
    try {
      const token = this.sessionService.obtenerToken();

      const { data } = await axios.put<Response>(
        `${environment.apiKey}/cuentas/actualizar-nombre`,
        { primerNombre, segundoNombre, primerApellido, segundoApellido },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        this.alertsService.message('success', data.message);
        return data.body.cuentaActualizada;
      } else {
        this.alertsService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor. Inténtelo de nuevo más tarde.'
      );
      return false;
    }
  }

  public async actualizarFechaNacimiento(
    fechaNacimiento: string
  ): Promise<boolean> {
    try {
      const token = this.sessionService.obtenerToken();

      const { data } = await axios.put<Response>(
        `${environment.apiKey}/cuentas/actualizar-fecha-nacimiento`,
        { fechaNacimiento },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        this.alertsService.message('success', data.message);
        return data.body.cuentaActualizada;
      } else {
        this.alertsService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor. Inténtelo de nuevo más tarde.'
      );
      return false;
    }
  }

  public async actualizarCorreo(correo: string): Promise<boolean> {
    try {
      const token = this.sessionService.obtenerToken();

      const { data } = await axios.put<Response>(
        `${environment.apiKey}/cuentas/actualizar-correo`,
        { correo },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        this.alertsService.message('success', data.message);
        return data.body.cuentaActualizada;
      } else {
        this.alertsService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor. Inténtelo de nuevo más tarde.'
      );
      return false;
    }
  }

  public async actualizarClave(
    claveActual: string,
    clave: string
  ): Promise<boolean> {
    try {
      const token = this.sessionService.obtenerToken();

      const { data } = await axios.put<Response>(
        `${environment.apiKey}/cuentas/actualizar-clave`,
        { claveActual, clave },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        this.alertsService.message('success', data.message);
        return data.body.cuentaActualizada;
      } else {
        this.alertsService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor. Inténtelo de nuevo más tarde.'
      );
      return false;
    }
  }
}
