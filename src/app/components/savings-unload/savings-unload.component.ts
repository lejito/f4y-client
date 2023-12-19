import { Component, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UtilsService } from 'src/app/services/utils.service';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { DescargaCuenta } from 'src/types/Movimiento';

@Component({
  selector: 'app-savings-unload',
  templateUrl: './savings-unload.component.html',
  styleUrls: ['./savings-unload.component.css'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SavingsUnloadComponent {
  constructor(
    private utilsService: UtilsService,
    private movimientosService: MovimientosService
  ) {}

  @Output() closeDialog = new EventEmitter();
  @Output() unloadConfirmed = new EventEmitter<DescargaCuenta>();

  public patronMonto = this.utilsService.patronMonto;

  public formularioEnviado = false;
  public formulario = {
    cuenta: '',
    monto: '',
  };

  public verificarCampos() {
    return (
      !!this.formulario.cuenta &&
      this.formulario.cuenta.length <= 10 &&
      !!this.formulario.monto &&
      this.patronMonto.test(this.formulario.monto)
    );
  }

  public async descargar() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {
      this.utilsService.isLoading = true;
      const movimiento = await this.movimientosService.descargarCuenta(
        'quyne',
        this.formulario.cuenta,
        parseFloat(this.formulario.monto)
      );

      if (movimiento) {
        this.unloadConfirmed.emit({
          id: movimiento.id,
          tipo: movimiento.tipo,
          entidadDestino: 'Quyne',
          cuentaDestino: this.formulario.cuenta,
          monto: movimiento.monto,
          fecha: movimiento.fecha,
        });
        this.cerrar();
      }
      this.utilsService.isLoading = false;
    }
  }

  public cerrar(): void {
    this.closeDialog.emit();
  }
}
