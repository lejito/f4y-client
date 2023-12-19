import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css'],
})
export class InvestmentsComponent implements OnInit, OnDestroy {
  constructor(private title: Title, private utilsService: UtilsService) {
    this.title.setTitle('Fin4Youth: Inversiones');
  }

  public rutaActual = '';
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.utilsService
      .obtenerRutaActual()
      .subscribe((ruta) => {
        this.rutaActual = ruta.replace('/panel/investments', '');
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
