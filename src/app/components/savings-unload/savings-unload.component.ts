import { Component, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UtilsService } from 'src/app/services/utils.service';

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
  constructor(private utilsService: UtilsService) {}

  @Output() closeDialog = new EventEmitter();

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
      !!this.patronMonto &&
      this.patronMonto.test(this.formulario.monto)
    );
  }

  public async descargar() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {
      //Here
    }
  }

  public cerrar(): void {
    this.closeDialog.emit();
  }
}
