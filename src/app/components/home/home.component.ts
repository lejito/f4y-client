import { Component } from '@angular/core';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private cuentasService: CuentasService) {}

  public isLoading = false;
  public rutaActual: string = '';

  public async cerrarSesion(): Promise<void> {
    this.isLoading = true;
    await this.cuentasService.cerrarSesion().finally(() => {
      this.isLoading = false;
    });
  }
}
