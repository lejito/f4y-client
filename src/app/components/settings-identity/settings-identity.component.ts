import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-settings-identity',
  templateUrl: './settings-identity.component.html',
})
export class SettingsIdentityComponent implements OnInit {
  constructor(
    private alertService: AlertsService,
    private utilsService: UtilsService,
    private cuentasService: CuentasService
  ) {}

  public datosCargados = false;
  public formularioEnviado = false;

  public formulario = {
    tipoIdentificacion: '',
    numeroIdentificacion: '',
  };

  async ngOnInit(): Promise<void> {
    const identificacion = await this.cuentasService.obtenerIdentificacion();
    if (!!identificacion) {
      this.formulario = identificacion;
    }
    this.datosCargados = true;
  }

  public verificarCampos() {
    return (
      !!this.formulario.tipoIdentificacion &&
      !!this.formulario.numeroIdentificacion &&
      this.formulario.tipoIdentificacion.length <= 10
    );
  }

  public async actualizar() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {
      this.alertService
        .confirm('¿Estás segur@ que deseas modificar la identificación?')
        .then(async (confirmado) => {
          if (confirmado) {
            this.utilsService.isLoading = true;
            await this.cuentasService.actualizarIdentificacion(
              this.formulario.tipoIdentificacion,
              this.formulario.numeroIdentificacion
            );
            this.utilsService.isLoading = false;
          }
        });
    }
  }
}
