import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Response } from '../../types/Response';
import { NombreCompleto } from '../../types/Cuenta';
import { Router } from '@angular/router';
import { AlertService } from './alerts.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class CuentasService {
  constructor(
    private router: Router,
    private alertService: AlertService,
    private sessionService: SessionService
  ) {}

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
        this.alertService.message('success', data.message);
        this.router.navigate(['/login']);
        return true;
      } else {
        this.alertService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertService.message(
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
        this.alertService.message('success', data.message);
        this.sessionService.guardarToken(data.body?.token);
        this.router.navigate(['/panel']);
        return true;
      } else {
        this.alertService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertService.message(
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
        this.alertService.message('success', data.message);
        this.sessionService.borrarToken();
        this.router.navigate(['/']);
        return true;
      } else {
        this.alertService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertService.message(
        'error',
        'Ha ocurrido un error en el servidor. Inténtelo de nuevo más tarde.'
      );
      return false;
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
            this.alertService.message(
              'error',
              'La sesión ha expirado. Inicie sesión nuevamente.'
            );
            this.router.navigate(['/login']);
          }
          return false;
        }
      } else {
        if (pagina == 'panel') {
          this.alertService.message(
            'error',
            'Es necesario iniciar sesión para acceder a esta ruta.'
          );
          this.router.navigate(['/login']);
        }
        return false;
      }
    } catch (error) {
      if (pagina == 'panel') {
        this.alertService.message(
          'error',
          'La sesión ha expirado. Inicie sesión nuevamente.'
        );
        this.router.navigate(['/login']);
      }
      return false;
    }
  }
}
