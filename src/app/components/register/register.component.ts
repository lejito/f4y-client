import { Component } from '@angular/core';
import * as moment from 'moment';
import { AlertService } from 'src/services/alerts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private alertService: AlertService) {}

  ngOnInit(): void {}

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
    fechaNacimiento: moment().format('yyyy-MM-DD'),
    correo: '',
    clave: '',
    repetirClave: '',
    tratamientoDatos: false,
    terminosYCondiciones: false,
  };

  public verificarCampos() {
    console.log("XD");
    return (
      this.formulario.tipoIdentificacion &&
      this.formulario.numeroIdentificacion &&
      this.formulario.tipoIdentificacion.length <= 10 &&
      this.formulario.primerNombre &&
      this.formulario.primerNombre.length <= 20 &&
      this.formulario.segundoNombre.length <= 20 &&
      this.formulario.primerApellido &&
      this.formulario.primerApellido.length <= 20 &&
      this.formulario.segundoApellido.length <= 20 &&
      this.formulario.fechaNacimiento &&
      this.formulario.correo &&
      this.formulario.correo.length <= 120 &&
      this.patronCorreo.test(this.formulario.correo) &&
      this.formulario.clave &&
      this.formulario.clave.length >= 8 &&
      this.formulario.clave.length <= 20 &&
      this.patronClave.test(this.formulario.clave) &&
      this.formulario.repetirClave &&
      this.formulario.clave == this.formulario.repetirClave &&
      this.formulario.tratamientoDatos &&
      this.formulario.terminosYCondiciones
    );
  }

  public registrar() {
    this.formularioEnviado = true;
    if (this.verificarCampos()) {

    }
  }
}
