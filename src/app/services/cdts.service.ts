import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Response } from '../../types/Response';
import { CDT } from '../../types/CDT';
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
}
