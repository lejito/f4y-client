import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Response } from '../../types/Response';
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
    segundoNombre: string,
    primerApellido: string,
    segundoApellido: string,
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
      console.log(error);
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
      console.log(error);
      this.alertService.message(
        'error',
        'Ha ocurrido un error en el servidor. Inténtelo de nuevo más tarde.'
      );
      return false;
    }
  }
}
