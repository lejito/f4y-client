import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Response } from '../../types/Response';
import { Movimiento } from 'src/types/Movimiento';
import { CDT, CDTCalc } from '../../types/CDT';
import { AlertsService } from './alerts.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class CDTsService {
  constructor(
    private alertsService: AlertsService,
    private utilsService: UtilsService
  ) {}

  public async calcular(
    inversion: number,
    duracion: number,
    fechaInicio: string
  ): Promise<CDTCalc | null> {
    try {
      const token = this.utilsService.obtenerToken();

      const { data } = await axios.post<Response>(
        `${environment.apiKey}/cdts/calcular`,
        { inversion, duracion, fechaInicio },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.cdt;
      } else {
        this.alertsService.message('error', data.message);
        return null;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor al intentar calcular el CDT.'
      );
      return null;
    }
  }

  public async crear(
    inversion: number,
    duracion: number,
    fechaInicio: string
  ): Promise<Movimiento | null> {
    try {
      const token = this.utilsService.obtenerToken();

      const { data } = await axios.post<Response>(
        `${environment.apiKey}/cdts/crear`,
        { inversion, duracion, fechaInicio },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.movimiento;
      } else {
        this.alertsService.message('error', data.message);
        return null;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor al intentar crear el CDT.'
      );
      return null;
    }
  }

  public async obtenerTodos(): Promise<CDT[] | null> {
    try {
      const token = this.utilsService.obtenerToken();

      const { data } = await axios.get<Response>(
        `${environment.apiKey}/cdts/obtener-todos`,
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.cdts;
      } else {
        this.alertsService.message('error', data.message);
        return null;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor al intentar obtener los CDTs.'
      );
      return null;
    }
  }

  public async obtener(id: number): Promise<CDT | null> {
    try {
      const token = this.utilsService.obtenerToken();
      const { data } = await axios.post<Response>(
        `${environment.apiKey}/cdts/obtener`,
        { id },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.cdt;
      } else {
        this.alertsService.message('error', data.message);
        return null;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor al intentar obtener el CDT.'
      );
      return null;
    }
  }

  public async liquidar(id: number): Promise<Movimiento | null> {
    try {
      const token = this.utilsService.obtenerToken();
      const { data } = await axios.post<Response>(
        `${environment.apiKey}/cdts/liquidar`,
        { id },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.movimiento;
      } else {
        this.alertsService.message('error', data.message);
        return null;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor al intentar liquidar el CDT.'
      );
      return null;
    }
  }

  public async cancelar(id: number): Promise<Movimiento | null> {
    try {
      const token = this.utilsService.obtenerToken();
      const { data } = await axios.post<Response>(
        `${environment.apiKey}/cdts/cancelar`,
        { id },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.movimiento;
      } else {
        this.alertsService.message('error', data.message);
        return null;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor al intentar cancelar el CDT.'
      );
      return null;
    }
  }
}
