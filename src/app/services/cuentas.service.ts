import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from './alerts.service';
import axios from 'axios';
import { Response } from '../../types/Response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CuentasService {
  constructor(private alertService: AlertService, private router: Router) {}

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
      this.alertService.message('error', 'Ha ocurrido un error inesperado.');
      return false;
    }
  }
}
