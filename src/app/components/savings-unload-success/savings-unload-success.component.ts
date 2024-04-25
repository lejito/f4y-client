import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UtilsService } from 'src/app/services/utils.service';
import { DescargaCuenta } from '../../../types/Movimiento';

@Component({
  selector: 'app-savings-unload-success',
  templateUrl: './savings-unload-success.component.html',
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
export class SavingsUnloadSuccessComponent {
  constructor(public utilsService: UtilsService) {}

  @Input({ required: true })
  movimiento!: DescargaCuenta;
  @Output() closeDialog = new EventEmitter();

  public cerrar(): void {
    this.closeDialog.emit();
  }
}
