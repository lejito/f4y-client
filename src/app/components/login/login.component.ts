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
}
