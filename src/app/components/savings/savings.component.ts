import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TipoMovimiento, Movimiento } from '../../../types/Movimiento';
import { UtilsService } from 'src/app/services/utils.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import { MovimientosService } from 'src/app/services/movimientos.service';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css'],
})
export class SavingsComponent implements OnInit, OnDestroy {
  constructor(
    private title: Title,
    public utilsService: UtilsService,
    private cuentasService: CuentasService,
    private movimientosService: MovimientosService
  ) {
    this.title.setTitle('Fin4Youth: Cuenta de ahorros');
  }

  public saldoOculto = false;
  private subscription = new Subscription();
  public saldo: number | null = null;
  public ultimosMovimientos: Movimiento[] = [];
  public tiposLoad: TipoMovimiento[] = [
    'carga-cuenta',
    'descarga-bolsillo',
    'liquidacion-cdt',
    'cancelacion-cdt',
  ];
  public tiposUnload: TipoMovimiento[] = [
    'descarga-cuenta',
    'carga-bolsillo',
    'inversion-cdt',
  ];
  public dialogoCarga = false;
  public cuentaCarga = '';
  public dialogoDescarga = false;

  ngOnInit(): void {
    this.cargarDatos();
    this.subscription = this.utilsService
      .obtenerSaldoOculto()
      .subscribe((saldoOculto) => {
        this.saldoOculto = saldoOculto;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleSaldoOculto(): void {
    this.utilsService.actualizarSaldoOculto(!this.saldoOculto);
  }

  public async cargarDatos(): Promise<void> {
    this.utilsService.isLoading = true;
    await this.obtenerSaldo();
    await this.obtenerUltimosMovimientos();
    this.utilsService.isLoading = false;
  }

  private async obtenerSaldo(): Promise<void> {
    const saldo = await this.cuentasService.obtenerSaldo();
    if (saldo !== null) {
      this.saldo = saldo;
    }
  }

  private async obtenerUltimosMovimientos(): Promise<void> {
    const movimientos =
      await this.movimientosService.obtenerUltimosMovimientos();
    if (movimientos !== null) {
      this.ultimosMovimientos = movimientos;
    }
  }

  public async cerrarDialogoCarga(): Promise<void> {
    await this.cargarDatos();
    this.dialogoCarga = false;
  }

  public cerrarDialogoDescarga(): void {
    this.dialogoDescarga = false;
  }

  public async abrirDialogoCarga(): Promise<void> {
    this.utilsService.isLoading = true;
    const identificacion = await this.cuentasService.obtenerIdentificacion();
    if (identificacion) {
      this.cuentaCarga =
        identificacion.tipoIdentificacion + identificacion.numeroIdentificacion;
      this.dialogoCarga = true;
    }
    this.utilsService.isLoading = false;
  }

  public async abrirDialogoDescarga(): Promise<void> {
    this.dialogoDescarga = true;
  }
}
