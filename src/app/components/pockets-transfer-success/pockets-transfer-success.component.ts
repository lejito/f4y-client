import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UtilsService } from 'src/app/services/utils.service';
import { TransferenciaBolsillo } from '../../../types/Movimiento';

@Component({
  selector: 'app-pockets-transfer-success',
  templateUrl: './pockets-transfer-success.component.html',
  styleUrls: ['./pockets-transfer-success.component.css'],
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
export class PocketsTransferSuccessComponent {
  constructor(public utilsService: UtilsService) {}

  @Input({ required: true })
  movimiento!: TransferenciaBolsillo | null;
  @Output() closeDialog = new EventEmitter();

  public cerrar(): void {
    this.closeDialog.emit();
  }
}
