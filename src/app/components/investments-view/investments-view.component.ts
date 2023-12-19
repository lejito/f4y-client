import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movimiento } from 'src/types/Movimiento';
import { UtilsService } from 'src/app/services/utils.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { CDTsService } from 'src/app/services/cdts.service';
import { CDT } from 'src/types/CDT';

@Component({
  selector: 'app-investments-view',
  templateUrl: './investments-view.component.html',
  styleUrls: ['./investments-view.component.css'],
})
export class InvestmentsViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public utilsService: UtilsService,
    private alertsService: AlertsService,
    private cdtsService: CDTsService
  ) {}

  public id: string = '';
  public cdt: CDT | null = null;
  public dialogoConfirmacion = false;
  public transferencia: Movimiento | null = null;

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    await this.cargarDatos();
  }

  private async cargarDatos(): Promise<void> {
    this.utilsService.isLoading = true;
    await this.obtenerCDT();
    this.utilsService.isLoading = false;
  }

  private async obtenerCDT(): Promise<void> {
    const cdt = await this.cdtsService.obtener(parseInt(this.id));
    if (cdt !== null) {
      this.cdt = cdt;
    }
  }

  public abrirDialogoConfirmacion(transferencia: Movimiento): void {
    this.transferencia = transferencia;
    this.dialogoConfirmacion = true;
  }

  public async cerrarDialogoConfirmacion(): Promise<void> {
    this.dialogoConfirmacion = false;
    await this.cargarDatos();
  }

  public async liquidarCDT(id: number): Promise<void> {
    this.alertsService
      .confirm(
        '¿Estás segur@ de que deseas liquidar este CDT? La devolución final será depositada en tu cuenta de ahorros.'
      )
      .then(async (confirmacion) => {
        if (confirmacion) {
          this.utilsService.isLoading = true;
          const movimiento = await this.cdtsService.liquidar(id);
          this.utilsService.isLoading = false;
          if (movimiento) {
            await this.cargarDatos();
            this.abrirDialogoConfirmacion(movimiento);
          }
        }
      });
  }

  public async cancelarCDT(id: number): Promise<void> {
    this.alertsService
      .confirm(
        '¿Estás segur@ de que deseas cancelar este CDT? La inversión será depositada en tu cuenta de ahorros.'
      )
      .then(async (confirmacion) => {
        if (confirmacion) {
          this.utilsService.isLoading = true;
          const movimiento = await this.cdtsService.cancelar(id);
          this.utilsService.isLoading = false;
          if (movimiento) {
            await this.cargarDatos();
            this.abrirDialogoConfirmacion(movimiento);
          }
        }
      });
  }
}
