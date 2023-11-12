import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UtilsService } from 'src/app/services/utils.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private title: Title,
    private utilsService: UtilsService,
    private cuentasService: CuentasService
  ) {
    this.title.setTitle('Fin4Youth: Inicio de sesión');
  }

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
      this.utilsService.isLoading = true;
      await this.cuentasService.iniciarSesion(
        this.formulario.tipoIdentificacion,
        this.formulario.numeroIdentificacion,
        this.formulario.clave
      );
      this.utilsService.isLoading = false;
    }
  }
}
