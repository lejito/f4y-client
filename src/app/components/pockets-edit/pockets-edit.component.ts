import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-pockets-edit',
  templateUrl: './pockets-edit.component.html',
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
export class PocketsEditComponent implements OnInit {
  constructor(
    private utilsService: UtilsService,
    private bolsillosService: BolsillosService
  ) {}

  @Input({ required: true }) bolsillo!: Bolsillo | null;
  @Output() closeDialog = new EventEmitter();
  @Output() editConfirmed = new EventEmitter();

  public patronMonto = this.utilsService.patronMonto;

  public formularioEnviado = false;
  public formulario = {
    nombre: '',
    saldoObjetivo: '',
    saldoOjetivoNulo: false,
  };

  ngOnInit(): void {
    if (this.bolsillo) {
      this.formulario.nombre = this.bolsillo.nombre;
      this.formulario.saldoObjetivo = this.bolsillo.saldoObjetivo
        ? this.bolsillo.saldoObjetivo.toString()
        : '';
      this.formulario.saldoOjetivoNulo = this.bolsillo.saldoObjetivo === null;
    }
  }

  public verificarCampos() {
    return (
      !!this.formulario.nombre &&
      this.formulario.nombre.length <= 20 &&
      (this.formulario.saldoOjetivoNulo ||
        (!!this.formulario.saldoObjetivo &&
          this.patronMonto.test(this.formulario.saldoObjetivo)))
    );
  }

  public async actualizar() {
    this.formularioEnviado = true;
    if (this.verificarCampos() && this.bolsillo?.id) {
      this.utilsService.isLoading = true;
      const bolsilloCreado = await this.bolsillosService.actualizar(
        this.bolsillo.id,
        this.formulario.nombre,
        this.formulario.saldoOjetivoNulo
          ? null
          : parseFloat(this.formulario.saldoObjetivo)
      );
      this.utilsService.isLoading = false;

      if (bolsilloCreado) {
        this.cerrar();
        this.editConfirmed.emit();
      }
    }
  }

  public cerrar(): void {
    this.closeDialog.emit();
  }
}
