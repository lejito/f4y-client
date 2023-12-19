import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UtilsService } from 'src/app/services/utils.service';
import { Movimiento } from '../../../types/Movimiento';

@Component({
  selector: 'app-investments-transfer',
  templateUrl: './investments-transfer.component.html',
  styleUrls: ['./investments-transfer.component.css'],
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
export class InvestmentsTransferComponent {
  constructor(public utilsService: UtilsService) {}

  @Input({ required: true })
  movimiento!: Movimiento | null;
  @Output() closeDialog = new EventEmitter();

  public cerrar(): void {
    this.closeDialog.emit();
  }
}
