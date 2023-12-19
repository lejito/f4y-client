import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import { NombreCompleto } from 'src/types/Cuenta';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit, OnDestroy {
  constructor(
    private utilsService: UtilsService,
    private cuentasService: CuentasService
  ) {}

  public rutaActual = '';
  public subsRuta = new Subscription();
  public nombre: NombreCompleto | null = null;
  public fechaTexto: string | null = null;
  public horaTexto: string | null = null;
  private subsFecha = new Subscription();
  private subsSesion = new Subscription();

  async ngOnInit(): Promise<void> {
    this.subsRuta = this.utilsService.obtenerRutaActual().subscribe((ruta) => {
      this.rutaActual = ruta.replace('/panel', '');
    });

    this.nombre = await this.obtenerNombre();

    this.subsFecha = interval(1000).subscribe(() => {
      this.fechaTexto = this.calcularFecha().fecha;
      this.horaTexto = this.calcularFecha().hora;
    });

    this.subsSesion = interval(60000).subscribe(async () => {
      await this.cuentasService.verificarSesion('panel');
    });
  }

  ngOnDestroy(): void {
    this.subsRuta.unsubscribe();
    this.subsFecha.unsubscribe();
    this.subsSesion.unsubscribe();
  }

  private calcularFecha(): { fecha: string; hora: string } {
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const fechaTexto =
      fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
    const horaTexto = fecha.toLocaleTimeString('es-CO', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    });
    return { fecha: fechaTexto, hora: horaTexto };
  }

  private async obtenerNombre(): Promise<NombreCompleto | null> {
    const nombreCompleto = await this.cuentasService.obtenerNombre();
    return nombreCompleto;
  }
}
