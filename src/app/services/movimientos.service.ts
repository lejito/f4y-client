import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Response } from '../../types/Response';
import { Movimiento } from '../../types/Movimiento';
import { AlertsService } from './alerts.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class MovimientosService {
  constructor(
    private alertsService: AlertsService,
    private utilsService: UtilsService
  ) {}

  public async obtenerUltimosMovimientos(): Promise<Movimiento[] | null> {
    try {
      const token = this.utilsService.obtenerToken();

      const { data } = await axios.get<Response>(
        `${environment.apiKey}/movimientos/obtener-ultimos`,
        { headers: { Authorization: token } }
      );

      if (!data.error) {
        return data.body.movimientos;
      } else {
        return null;
      }
    } catch (error) {
      this.alertsService.message(
        'error',
        'Ha ocurrido un error en el servidor al intentar obtener los últimos movimientos.'
      );
      return null;
    }
  }
}
