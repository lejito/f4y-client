import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { Bolsillo } from 'src/types/Bolsillo';
import { BolsillosService } from 'src/app/services/bolsillos.service';

@Component({
  selector: 'app-pockets',
  templateUrl: './pockets.component.html',
  styleUrls: ['./pockets.component.css'],
})
export class PocketsComponent implements OnInit {
  constructor(
    public utilsService: UtilsService,
    private bolsillosService: BolsillosService
  ) {}

  public bolsillos: Bolsillo[] = [];
  public dialogoCrear = false;

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
}
