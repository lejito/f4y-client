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
import { Movimiento } from 'src/types/Movimiento';

@Component({
  selector: 'app-pockets-record',
  templateUrl: './pockets-record.component.html',
  styleUrls: ['./pockets-record.component.css'],
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
export class PocketsRecordComponent {
  constructor(
    private utilsService: UtilsService,
    private bolsillosService: BolsillosService
  ) {}

  @Input({ required: true }) bolsillo!: Bolsillo | null;
  @Output() closeDialog = new EventEmitter();

  public movimientos: Movimiento[] = [];

  ngOnInit(): void {
    if (this.bolsillo) {
      this.buscarMovimientos(this.bolsillo.id);
    }
  }

  private async buscarMovimientos(idBolsillo: number): Promise<void> {
    this.utilsService.isLoading = true;
    const movimientos = await this.bolsillosService.obtenerMovimientos(idBolsillo);
    if (movimientos) {
      this.movimientos = movimientos;
    }
    this.utilsService.isLoading = false;
  }

  public cerrar(): void {
    this.closeDialog.emit();
  }
}
