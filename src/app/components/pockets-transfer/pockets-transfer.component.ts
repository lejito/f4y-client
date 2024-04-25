import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UtilsService } from 'src/app/services/utils.service';
import { BolsillosService } from 'src/app/services/bolsillos.service';
import { Bolsillo } from 'src/types/Bolsillo';
import { TransferenciaBolsillo } from 'src/types/Movimiento';

@Component({
  selector: 'app-pockets-transfer',
  templateUrl: './pockets-transfer.component.html',
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
export class PocketsTransferComponent {
  constructor(
    private utilsService: UtilsService,
    private bolsillosService: BolsillosService
  ) {}

  @Input({ required: true }) bolsillo!: Bolsillo | null;
  @Output() closeDialog = new EventEmitter();
  @Output() transferConfirmed = new EventEmitter<TransferenciaBolsillo>();

  public patronMonto = this.utilsService.patronMonto;

  public formularioEnviado = false;
  public formulario = {
    tipo: '',
    monto: '',
    transferirTodo: false,
  };

  public descargarSaldoTotal() {
    if (this.formulario.transferirTodo && this.bolsillo) {
      this.formulario.monto = this.bolsillo?.saldo.toString();
    }
  }

  public verificarCampos() {
    return (
      !!this.formulario.tipo &&
      !!this.formulario.monto &&
      (this.formulario.transferirTodo ||
        this.patronMonto.test(this.formulario.monto))
    );
  }

  public async transferir() {
    this.formularioEnviado = true;
    if (this.verificarCampos() && this.bolsillo?.id) {
      this.utilsService.isLoading = true;
      let movimiento = null;
      if (this.formulario.tipo == 'carga') {
        movimiento = await this.bolsillosService.cargar(
          this.bolsillo.id,
          parseFloat(this.formulario.monto)
        );
      } else {
        movimiento = await this.bolsillosService.descargar(
          this.bolsillo.id,
          parseFloat(this.formulario.monto)
        );
      }
      this.utilsService.isLoading = false;

      if (movimiento) {
        this.cerrar();
        this.transferConfirmed.emit({
          ...movimiento,
          nombreBolsillo: this.bolsillo.nombre,
        });
      }
    }
  }

  public cerrar(): void {
    this.closeDialog.emit();
  }
}
