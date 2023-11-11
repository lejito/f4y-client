import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingService } from 'src/app/services/loading.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private title: Title,
    private loadingService: LoadingService,
    private cuentasService: CuentasService
  ) {
    this.title.setTitle('Fin4Youth: Inicio');
  }

  public rutaActual: string = '';

  public async cerrarSesion(): Promise<void> {
    this.loadingService.isLoading = true;
    await this.cuentasService.cerrarSesion();
    this.loadingService.isLoading = false;
  }
}
