import { Component, OnInit } from '@angular/core';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor(private cuentasService: CuentasService) {}

  public sesionAbierta = false;

  async ngOnInit(): Promise<void> {
    this.sesionAbierta = await this.cuentasService.verificarSesion('landing');
  }
}
