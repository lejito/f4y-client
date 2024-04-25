import { Component } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-settings-password',
  templateUrl: './settings-password.component.html',
})
export class SettingsPasswordComponent {
  constructor(
    private alertService: AlertsService,
    private utilsService: UtilsService,
    private cuentasService: CuentasService
  ) {}

  public formularioEnviado = false;

  public patronClave = this.utilsService.patronClave;

  public formulario = {
    claveActual: '',
    clave: '',
    repetirClave: '',
  };

  public verificarCampos() {
    return (
      !!this.formulario.claveActual &&
      !!this.formulario.clave &&
      this.formulario.clave.length >= 8 &&
      this.formulario.clave.length <= 20 &&
      this.patronClave.test(this.formulario.clave) &&
      !!this.formulario.repetirClave &&
      this.formulario.clave == this.formulario.repetirClave
    );
  }

  private limpiarCampos() {
    this.formulario.claveActual = '';
    this.formulario.clave = '';
    this.formulario.repetirClave = '';
  }

  public async actualizar() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {
      this.alertService
        .confirm('¿Estás segur@ que deseas modificar la contraseña?')
        .then(async (confirmado) => {
          if (confirmado) {
            this.utilsService.isLoading = true;
            await this.cuentasService.actualizarClave(
              this.formulario.claveActual,
              this.formulario.clave
            );
            this.utilsService.isLoading = false;
            this.limpiarCampos();
            this.formularioEnviado = false;
          }
        });
    }
  }
}
