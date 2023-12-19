import { Component } from '@angular/core';
import { Movimiento } from 'src/types/Movimiento';
import { UtilsService } from 'src/app/services/utils.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { CDTsService } from 'src/app/services/cdts.service';
import { CDTCalc } from 'src/types/CDT';

@Component({
  selector: 'app-investments-create',
  templateUrl: './investments-create.component.html',
  styleUrls: ['./investments-create.component.css'],
})
export class InvestmentsCreateComponent {
  constructor(
    public utilsService: UtilsService,
    private alertsService: AlertsService,
    private cdtsService: CDTsService
  ) {}

  public cdtCalculado: CDTCalc | null = null;

  public patronMonto = this.utilsService.patronMontoInversion;
  public patronDuracion = this.utilsService.patronDuracionInversion;

  public formularioEnviado = false;
  public formulario = {
    inversion: '',
    duracion: '',
  };

  public dialogoConfirmacion = false;
  public transferencia: Movimiento | null = null;

  public verificarCampos() {
    return (
      !!this.formulario.inversion &&
      this.patronMonto.test(this.formulario.inversion) &&
      !!this.formulario.duracion &&
      this.patronDuracion.test(this.formulario.duracion)
    );
  }

  public async calcular() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {
      this.utilsService.isLoading = true;
      const fechaActual = new Date().toISOString().slice(0, 10);
      const cdtCalc = await this.cdtsService.calcular(
        parseFloat(this.formulario.inversion),
        parseInt(this.formulario.duracion),
        fechaActual
      );
      this.cdtCalculado = cdtCalc;
      this.utilsService.isLoading = false;
    }
  }

  public abrirDialogoConfirmacion(transferencia: Movimiento): void {
    this.transferencia = transferencia;
    this.dialogoConfirmacion = true;
  }

  public async cerrarDialogoConfirmacion(): Promise<void> {
    this.dialogoConfirmacion = false;
  }

  public async crear() {
    this.alertsService
      .confirm(
        '¿Estás segur@ de que deseas crear el CDT? La inversión será descontada de tu cuenta de ahorros.'
      )
      .then(async (confirmacion) => {
        if (confirmacion) {
          this.utilsService.isLoading = true;
          const fechaActual = new Date().toISOString().slice(0, 10);
          const movimiento = await this.cdtsService.crear(
            parseFloat(this.formulario.inversion),
            parseInt(this.formulario.duracion),
            fechaActual
          );
          this.utilsService.isLoading = false;
          if (movimiento) {
            this.abrirDialogoConfirmacion(movimiento);
          }
        }
      });
  }
}
