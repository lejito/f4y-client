import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-settings-name',
  templateUrl: './settings-name.component.html',
  styleUrls: ['./settings-name.component.css'],
})
export class SettingsNameComponent implements OnInit {
  constructor(
    private alertService: AlertsService,
    private loadingService: LoadingService,
    private cuentasService: CuentasService
  ) {}

  public datosCargados = false;
  public formularioEnviado = false;

  public formulario = {
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
  };

  async ngOnInit(): Promise<void> {
    const nombre = await this.cuentasService.obtenerNombre();
    if (!!nombre) {
      this.formulario = nombre;
    }
    this.datosCargados = true;
  }

  public verificarCampos() {
    return (
      !!this.formulario.primerNombre &&
      this.formulario.primerNombre.length <= 20 &&
      this.formulario.segundoNombre.length <= 20 &&
      !!this.formulario.primerApellido &&
      this.formulario.primerApellido.length <= 20 &&
      this.formulario.segundoApellido.length <= 20
    );
  }

  public async actualizar() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {
      this.alertService
        .confirm('¿Estás segur@ que deseas modificar el nombre?')
        .then(async (confirmado) => {
          if (confirmado) {
            this.loadingService.isLoading = true;
            await this.cuentasService.actualizarNombre(
              this.formulario.primerNombre,
              !!this.formulario.segundoNombre
                ? this.formulario.segundoNombre
                : null,
              this.formulario.primerApellido,
              !!this.formulario.segundoApellido
                ? this.formulario.segundoApellido
                : null
            );
            this.loadingService.isLoading = false;
          }
        });
    }
  }
}
