import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TipoMovimiento } from '../../types/Movimiento';
import * as moment from 'moment';
import { EstadoCDT } from 'src/types/CDT';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  constructor() {
    const saldoOculto = localStorage.getItem(this.saldoOcultoKey) === 'true';
    this._saldoOculto = new BehaviorSubject<boolean>(saldoOculto);
  }

  private readonly tokenKey = 'STK';
  private readonly saldoOcultoKey = 'SO';
  private _isLoading = new BehaviorSubject<boolean>(false);
  private _saldoOculto = new BehaviorSubject<boolean>(false);

  private readonly _patronCorreo =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private readonly _patronClave =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_.,:;!"#$%&/()=?¿¡{}[\]*+~\\|°<>])\S*$/;
  private readonly _patronMonto =
    /^(5000|500[1-9]|50[1-9]\d|5[1-9]\d{2}|[6-9]\d{3}|\d{5,14})$/;

  public get patronCorreo() {
    return this._patronCorreo;
  }

  public get patronClave() {
    return this._patronClave;
  }

  public get patronMonto() {
    return this._patronMonto;
  }

  public obtenerToken(): string | null {
    const token = sessionStorage.getItem(this.tokenKey);
    return token;
  }

  public guardarToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  public borrarToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  public obtenerSaldoOculto(): Observable<boolean> {
    return this._saldoOculto.asObservable();
  }

  public actualizarSaldoOculto(saldoOculto: boolean): void {
    localStorage.setItem(this.saldoOcultoKey, saldoOculto.toString());
    this._saldoOculto.next(saldoOculto);
  }

  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  set isLoading(value: boolean) {
    this._isLoading.next(value);
  }

  public convertirCOP(monto: number): string {
    return monto.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  public convertirFecha(fecha: string): string {
    const timestamp = moment(fecha).format('yyyy/MM/DD hh:mm:ss A');

    return new Date(timestamp).toLocaleString('es-CO', {
      day: '2-digit',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  public obtenerNombreTipoMovimiento(tipoMovimiento: TipoMovimiento): string {
    const tiposMovimiento = {
      'carga-cuenta': 'Carga a cuenta',
      'descarga-cuenta': 'Descarga desde cuenta',
      'carga-bolsillo': 'Carga a bolsillo',
      'descarga-bolsillo': 'Descarga desde bolsillo',
      'inversion-cdt': 'Inversión a CDT',
      'liquidacion-cdt': 'Liquidación de CDT',
      'cancelacion-cdt': 'Cancelación de CDT',
    };

    return tiposMovimiento[tipoMovimiento] || 'Movimiento';
  }

  public obtenerNombreEstadoCDT(estadoCDT: EstadoCDT): string {
    const estadosCDT = {
      'apertura': 'Apertura',
      'en-curso': 'En curso',
      'finalizado': 'Finalizado',
      'liquidado': 'Liquidado',
      'cancelado': 'Cancelado',
    };

    return estadosCDT[estadoCDT] || 'EstadoCDT';
  }
}
