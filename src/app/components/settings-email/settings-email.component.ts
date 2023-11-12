import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-settings-email',
  templateUrl: './settings-email.component.html',
  styleUrls: ['./settings-email.component.css'],
})
export class SettingsEmailComponent implements OnInit {
  constructor(
    private alertService: AlertsService,
    private utilsService: UtilsService,
    private cuentasService: CuentasService
  ) {}

  public datosCargados = false;
  public formularioEnviado = false;

  public patronCorreo = this.utilsService.patronCorreo;

  public formulario = {
    correo: '',
  };

  async ngOnInit(): Promise<void> {
    const correo = await this.cuentasService.obtenerCorreo();
    if (!!correo) {
      this.formulario = correo;
    }
    this.datosCargados = true;
  }

  public verificarCampos() {
    return (
      !!this.formulario.correo &&
      this.formulario.correo.length <= 120 &&
      this.patronCorreo.test(this.formulario.correo)
    );
  }

  public async actualizar() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {
      this.alertService
        .confirm('¿Estás segur@ que deseas modificar el correo electrónico?')
        .then(async (confirmado) => {
          if (confirmado) {
            this.utilsService.isLoading = true;
            await this.cuentasService.actualizarCorreo(this.formulario.correo);
            this.utilsService.isLoading = false;
          }
        });
    }
  }
}
