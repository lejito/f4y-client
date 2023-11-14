import { Component, OnInit } from '@angular/core';
import { Bolsillo } from 'src/types/Bolsillo';
import { TransferenciaBolsillo } from 'src/types/Movimiento';
import { UtilsService } from 'src/app/services/utils.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { BolsillosService } from 'src/app/services/bolsillos.service';

@Component({
  selector: 'app-pockets',
  templateUrl: './pockets.component.html',
  styleUrls: ['./pockets.component.css'],
})
export class PocketsComponent implements OnInit {
  constructor(
    public utilsService: UtilsService,
    private alertService: AlertsService,
    private bolsillosService: BolsillosService
  ) {}

  public bolsillos: Bolsillo[] = [];
  public dialogoCrear = false;
  public dialogoActualizar = false;
  public dialogoHistorial = false;
  public dialogoTransferir = false;
  public dialogoConfirmacionTransferencia = false;
  public transferencia: TransferenciaBolsillo | null = null;
  public bolsilloActual: Bolsillo | null = null;

  async ngOnInit(): Promise<void> {
    await this.cargarDatos();
  }

  public async cargarDatos(): Promise<void> {
    this.utilsService.isLoading = true;
    await this.obtenerBolsillos();
    this.utilsService.isLoading = false;
  }

  private async obtenerBolsillos(): Promise<void> {
    const bolsillos = await this.bolsillosService.obtener();
    if (bolsillos !== null) {
      this.bolsillos = bolsillos;
    }
  }

  public abrirDialogoCrear(): void {
    this.dialogoCrear = true;
  }

  public cerrarDialogoCrear(): void {
    this.dialogoCrear = false;
  }

  public abrirDialogoActualizar(bolsillo: Bolsillo): void {
    this.bolsilloActual = bolsillo;
    this.dialogoActualizar = true;
  }

  public cerrarDialogoActualizar(): void {
    this.dialogoActualizar = false;
  }

  public abrirDialogoHistorial(bolsillo: Bolsillo): void {
    this.bolsilloActual = bolsillo;
    this.dialogoHistorial = true;
  }

  public cerrarDialogoHistorial(): void {
    this.dialogoHistorial = false;
  }

  public abrirDialogoTransferir(bolsillo: Bolsillo): void {
    this.bolsilloActual = bolsillo;
    this.dialogoTransferir = true;
  }

  public cerrarDialogoTransferir(): void {
    this.dialogoTransferir = false;
  }

  public abrirDialogoConfirmacionTransferencia(
    transferencia: TransferenciaBolsillo
  ): void {
    this.transferencia = transferencia;
    this.dialogoConfirmacionTransferencia = true;
  }

  public async cerrarDialogoConfirmacionTransferencia(): Promise<void> {
    this.dialogoConfirmacionTransferencia = false;
    await this.cargarDatos();
  }

  public async eliminarBolsillo(id: number): Promise<void> {
    this.alertService
      .confirm('¿Estás segur@ de que deseas borrar este bolsillo?')
      .then(async (confirmacion) => {
        if (confirmacion) {
          this.utilsService.isLoading = true;
          const bolsilloEliminado = await this.bolsillosService.eliminar(id);
          this.utilsService.isLoading = false;
          if (bolsilloEliminado) {
            await this.cargarDatos();
          }
        }
      });
  }
}
