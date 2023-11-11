import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingService } from 'src/app/services/loading.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private title: Title,
    private loadingService: LoadingService,
    public cuentasService: CuentasService
  ) {
    this.title.setTitle('Fin4Youth: Registro');
  }

  public formularioEnviado = false;

  public patronCorreo = this.cuentasService.patronCorreo;

  public patronClave = this.cuentasService.patronClave;

  public formulario = {
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    fechaNacimiento: '',
    correo: '',
    clave: '',
    repetirClave: '',
    tratamientoDatos: false,
    terminosYCondiciones: false,
  };

  public verificarCampos() {
    const edad = this.cuentasService.calcularEdad(
      this.formulario.fechaNacimiento
    );
    return (
      !!this.formulario.tipoIdentificacion &&
      !!this.formulario.numeroIdentificacion &&
      this.formulario.tipoIdentificacion.length <= 10 &&
      !!this.formulario.primerNombre &&
      this.formulario.primerNombre.length <= 20 &&
      this.formulario.segundoNombre.length <= 20 &&
      !!this.formulario.primerApellido &&
      this.formulario.primerApellido.length <= 20 &&
      this.formulario.segundoApellido.length <= 20 &&
      !!this.formulario.fechaNacimiento &&
      edad >= 18 &&
      !!this.formulario.correo &&
      this.formulario.correo.length <= 120 &&
      this.patronCorreo.test(this.formulario.correo) &&
      !!this.formulario.clave &&
      this.formulario.clave.length >= 8 &&
      this.formulario.clave.length <= 20 &&
      this.patronClave.test(this.formulario.clave) &&
      !!this.formulario.repetirClave &&
      this.formulario.clave == this.formulario.repetirClave &&
      this.formulario.tratamientoDatos &&
      this.formulario.terminosYCondiciones
    );
  }

  public async registrar() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {
      this.loadingService.isLoading = true;
      await this.cuentasService.crear(
        this.formulario.tipoIdentificacion,
        this.formulario.numeroIdentificacion,
        this.formulario.primerNombre,
        !!this.formulario.segundoNombre ? this.formulario.segundoNombre : null,
        this.formulario.primerApellido,
        !!this.formulario.segundoApellido
          ? this.formulario.segundoApellido
          : null,
        this.formulario.fechaNacimiento,
        this.formulario.correo,
        this.formulario.clave
      );
      this.loadingService.isLoading = false;
    }
  }
}
