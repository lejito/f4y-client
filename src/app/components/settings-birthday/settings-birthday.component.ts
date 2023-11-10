import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-settings-birthday',
  templateUrl: './settings-birthday.component.html',
  styleUrls: ['./settings-birthday.component.css'],
})
export class SettingsBirthdayComponent implements OnInit {
  constructor(
    private alertService: AlertsService,
    private loadingService: LoadingService,
    public cuentasService: CuentasService
  ) {}

  public datosCargados = false;
  public formularioEnviado = false;

  public formulario = {
    fechaNacimiento: '',
  };

  async ngOnInit(): Promise<void> {
    const fechaNacimiento = await this.cuentasService.obtenerFechaNacimiento();
    if (!!fechaNacimiento) {
      this.formulario = fechaNacimiento;
    }
    this.datosCargados = true;
  }

  public verificarCampos() {
    const edad = this.cuentasService.calcularEdad(
      this.formulario.fechaNacimiento
    );
    return !!this.formulario.fechaNacimiento && edad >= 18;
  }

  public async actualizar() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {
      this.alertService
        .confirm('¿Estás segur@ que deseas modificar la fecha de nacimiento?')
        .then(async (confirmado) => {
          if (confirmado) {
            this.loadingService.isLoading = true;
            await this.cuentasService.actualizarFechaNacimiento(
              this.formulario.fechaNacimiento
            );
            this.loadingService.isLoading = false;
          }
        });
    }
  }
}
