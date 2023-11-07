import { Component } from '@angular/core';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private cuentasService: CuentasService) {}

  public isLoading = false;

  public formularioEnviado = false;

  public patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  public patronClave =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_.,:;!"#$%&/()=?¿¡{}[\]*+~\\|°<>])\S*$/;

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
    const edad = this.calcularEdad();
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

  public calcularEdad() {
    const fechaActual = new Date();
    const fechaNacimiento = new Date(this.formulario.fechaNacimiento);
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const diferenciaMeses = fechaActual.getMonth() - fechaNacimiento.getMonth();
    const diferenciaDias = fechaActual.getDate() - fechaNacimiento.getDate();
    if (diferenciaMeses < 0 || (diferenciaMeses == 0 && diferenciaDias <= 0)) {
      edad--;
    }
    return edad;
  }

  public async registrar() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {
      this.isLoading = true;
      await this.cuentasService
        .crear(
          this.formulario.tipoIdentificacion,
          this.formulario.numeroIdentificacion,
          this.formulario.primerNombre,
          !!this.formulario.segundoNombre
            ? this.formulario.segundoNombre
            : null,
          this.formulario.primerApellido,
          !!this.formulario.segundoApellido
            ? this.formulario.segundoApellido
            : null,
          this.formulario.fechaNacimiento,
          this.formulario.correo,
          this.formulario.clave
        )
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
}
