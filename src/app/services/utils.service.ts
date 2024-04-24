import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TipoMovimiento } from '../../types/Movimiento';
import { EstadoCDT } from 'src/types/CDT';
import moment from 'moment-timezone';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this._rutaActual.next(event.url);
      });
    const saldoOculto = localStorage.getItem(this.saldoOcultoKey) === 'true';
    this._saldoOculto = new BehaviorSubject<boolean>(saldoOculto);
    const filtradoCDTs = localStorage.getItem(this.filtradoCDTsKey) === 'true';
    this._filtradoCDTs = new BehaviorSubject<boolean>(filtradoCDTs);
  }

  private readonly tokenKey = 'STK';
  private readonly saldoOcultoKey = 'SO';
  private readonly filtradoCDTsKey = 'FCDT';
  private _rutaActual = new BehaviorSubject<string>('');
  private _isLoading = new BehaviorSubject<boolean>(false);
  private _saldoOculto = new BehaviorSubject<boolean>(false);
  private _filtradoCDTs = new BehaviorSubject<boolean>(false);

  private readonly _patronCorreo =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private readonly _patronClave =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_.,:;!"#$%&/()=?¿¡{}[\]*+~\\|°<>])\S*$/;
  private readonly _patronMonto =
    /^(5000|500[1-9]|50[1-9]\d|5[1-9]\d{2}|[6-9]\d{3}|\d{5,14})$/;
  private readonly _patronMontoInversion = /^(100000|[1-9]\d{5,13})$/;
  private readonly _patronDuracionInversion =
    /^(3[0-9]|[4-9][0-9]|[1-9][0-9]{2}|1[0-7][0-9]{2}|1800)$/;

  public get patronCorreo() {
    return this._patronCorreo;
  }

  public get patronClave() {
    return this._patronClave;
  }

  public get patronMonto() {
    return this._patronMonto;
  }

  public get patronMontoInversion() {
    return this._patronMontoInversion;
  }

  public get patronDuracionInversion() {
    return this._patronDuracionInversion;
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

  public obtenerRutaActual(): Observable<string> {
    return this._rutaActual.asObservable();
  }

  public obtenerSaldoOculto(): Observable<boolean> {
    return this._saldoOculto.asObservable();
  }

  public actualizarSaldoOculto(saldoOculto: boolean): void {
    localStorage.setItem(this.saldoOcultoKey, saldoOculto.toString());
    this._saldoOculto.next(saldoOculto);
  }

  public obtenerFiltradoCDTs(): Observable<boolean> {
    return this._filtradoCDTs.asObservable();
  }

  public actualizarFiltradoCDTs(filtradoCDTs: boolean): void {
    localStorage.setItem(this.filtradoCDTsKey, filtradoCDTs.toString());
    this._filtradoCDTs.next(filtradoCDTs);
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

  public convertirPorcentaje(porcentaje: number): string {
    return (porcentaje / 100).toLocaleString('es-CO', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  public convertirFecha(fecha: string, conHora: boolean = true): string {
    const formatString = conHora ? 'D [de] MMM, h:mm a' : 'D [de] MMMM [de] YYYY';
    return moment.tz(fecha, 'UTC').locale('es-CO').format(formatString);
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
      apertura: 'Apertura',
      'en-curso': 'En curso',
      finalizado: 'Finalizado',
      liquidado: 'Liquidado',
      cancelado: 'Cancelado',
    };

    return estadosCDT[estadoCDT] || 'EstadoCDT';
  }
}
