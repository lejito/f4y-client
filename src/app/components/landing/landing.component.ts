import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor(private title: Title, private cuentasService: CuentasService) {
    this.title.setTitle('Fin4Youth ~ ¡Empieza tu aventura financiera!');
  }

  public sesionAbierta = false;

  async ngOnInit(): Promise<void> {
    this.sesionAbierta = await this.cuentasService.verificarSesion('landing');
  }
}
