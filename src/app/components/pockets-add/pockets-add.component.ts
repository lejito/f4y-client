import { Component, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UtilsService } from 'src/app/services/utils.service';
import { BolsillosService } from 'src/app/services/bolsillos.service';

@Component({
  selector: 'app-pockets-add',
  templateUrl: './pockets-add.component.html',
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
export class PocketsAddComponent {
  constructor(
    private utilsService: UtilsService,
    private bolsillosService: BolsillosService
  ) {}

  @Output() closeDialog = new EventEmitter();
  @Output() createConfirmed = new EventEmitter();

  public patronMonto = this.utilsService.patronMonto;

  public formularioEnviado = false;
  public formulario = {
    nombre: '',
    saldoObjetivo: '',
    saldoOjetivoNulo: false,
  };

  public verificarCampos() {
    return (
      !!this.formulario.nombre &&
      this.formulario.nombre.length <= 20 &&
      (this.formulario.saldoOjetivoNulo ||
        (!!this.formulario.saldoObjetivo &&
          this.patronMonto.test(this.formulario.saldoObjetivo)))
    );
  }

  public async crear() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {
      this.utilsService.isLoading = true;
      const bolsilloCreado = await this.bolsillosService.crear(
        this.formulario.nombre,
        this.formulario.saldoOjetivoNulo
          ? null
          : parseFloat(this.formulario.saldoObjetivo)
      );
      this.utilsService.isLoading = false;

      if (bolsilloCreado) {
        this.cerrar();
        this.createConfirmed.emit();
      }
    }
  }

  public cerrar(): void {
    this.closeDialog.emit();
  }
}
