import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private loadingService: LoadingService,
    private cuentasService: CuentasService
  ) {}

  public formularioEnviado = false;

  public formulario = {
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    clave: '',
  };

  public verificarCampos() {
    return (
      !!this.formulario.tipoIdentificacion &&
      !!this.formulario.numeroIdentificacion &&
      !!this.formulario.clave
    );
  }

  public async ingresar() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {
      this.loadingService.isLoading = true;
      await this.cuentasService.iniciarSesion(
        this.formulario.tipoIdentificacion,
        this.formulario.numeroIdentificacion,
        this.formulario.clave
      );
      this.loadingService.isLoading = false;
    }
  }
}
