import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-settings-email',
  templateUrl: './settings-email.component.html',
  styleUrls: ['./settings-email.component.css'],
})
export class SettingsEmailComponent implements OnInit {
  constructor(
    private alertService: AlertsService,
    private loadingService: LoadingService,
    private cuentasService: CuentasService
  ) {}

  public datosCargados = false;
  public formularioEnviado = false;

  public patronCorreo = this.cuentasService.patronCorreo;

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
            this.loadingService.isLoading = true;
            await this.cuentasService.actualizarCorreo(this.formulario.correo);
            this.loadingService.isLoading = false;
          }
        });
    }
  }
}
