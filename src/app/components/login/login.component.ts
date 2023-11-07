import { Component } from '@angular/core';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private cuentasService: CuentasService) {}

  public isLoading = false;

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
      this.isLoading = true;
      await this.cuentasService
        .iniciarSesion(
          this.formulario.tipoIdentificacion,
          this.formulario.numeroIdentificacion,
          this.formulario.clave
        )
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
}
