import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Response } from '../../types/Response';
import { Movimiento } from '../../types/Movimiento';
import { Bolsillo } from 'src/types/Bolsillo';
import { AlertsService } from './alerts.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class BolsillosService {
  constructor(
    private alertsService: AlertsService,
    private utilsService: UtilsService
  ) {}

  public async obtener(): Promise<Bolsillo[] | null> {
    try {
      const token = this.utilsService.obtenerToken();

      const { data } = await axios.get<Response>(
        `${environment.apiKey}/bolsillos/obtener`,
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.bolsillos;
      } else {
        this.alertsService.message('error', data.message);
        return null;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor al intentar obtener los bolsillos.'
      );
      return null;
    }
  }

  public async crear(
    nombre: string,
    saldoObjetivo: number | null
  ): Promise<boolean> {
    try {
      const token = this.utilsService.obtenerToken();

      const { data } = await axios.post<Response>(
        `${environment.apiKey}/bolsillos/crear`,
        { nombre, saldoObjetivo },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        this.alertsService.message(
          'success',
          '¡El bolsillo ha sido creado correctamente!'
        );
        return data.body.bolsillo;
      } else {
        this.alertsService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor al intentar crear el bolsillo.'
      );
      return false;
    }
  }

  public async obtenerMovimientos(id: number): Promise<Movimiento[] | null> {
    try {
      const token = this.utilsService.obtenerToken();

      const { data } = await axios.post<Response>(
        `${environment.apiKey}/bolsillos/obtener-movimientos`,
        { id },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.movimientos;
      } else {
        this.alertsService.message('error', data.message);
        return null;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor al intentar obtener los movimientos del bolsillo.'
      );
      return null;
    }
  }

  public async actualizar(
    id: number,
    nombre: string,
    saldoObjetivo: number | null
  ): Promise<boolean> {
    try {
      const token = this.utilsService.obtenerToken();

      const { data } = await axios.put<Response>(
        `${environment.apiKey}/bolsillos/actualizar`,
        { id, nombre, saldoObjetivo },
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        this.alertsService.message(
          'success',
          '¡El bolsillo ha sido actualizado correctamente!'
        );
        return true;
      } else {
        this.alertsService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor al intentar actualizar el bolsillo.'
      );
      return false;
    }
  }

  public async eliminar(id: number): Promise<boolean> {
    try {
      const token = this.utilsService.obtenerToken();

      const { data } = await axios.delete<Response>(
        `${environment.apiKey}/bolsillos/eliminar`,
        { data: { id }, headers: { Authorization: token } }
      );

      if (!data.error) {
        this.alertsService.message(
          'success',
          '¡El bolsillo ha sido eliminado correctamente!'
        );
        return true;
      } else {
        this.alertsService.message('error', data.message);
        return false;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor al intentar eliminar el bolsillo.'
      );
      return false;
    }
  }

  public async cargar(id: number, monto: number): Promise<Movimiento | null> {
    try {
      const token = this.utilsService.obtenerToken();

      const { data } = await axios.post<Response>(
        `${environment.apiKey}/bolsillos/cargar`,
        { id, monto },
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
        'Ha ocurrido un error en el servidor al intentar cargar saldo al bolsillo.'
      );
      return null;
    }
  }

  public async descargar(
    id: number,
    monto: number
  ): Promise<Movimiento | null> {
    try {
      const token = this.utilsService.obtenerToken();

      const { data } = await axios.post<Response>(
        `${environment.apiKey}/bolsillos/descargar`,
        { id, monto },
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
        'Ha ocurrido un error en el servidor al intentar descargar saldo desde el bolsillo.'
      );
      return null;
    }
  }
}
