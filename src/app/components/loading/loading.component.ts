import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', animate(500)),
    ]),
  ],
})
export class LoadingComponent implements OnInit {
  public loadingMessages = [
    'Estamos cargando...',
    '¡Ya casi está listo!',
    'Un momento más...',
    'Preparando todo para ti...',
    '¡Estamos trabajando a toda máquina!',
    '¡Ya casi llegamos!',
    'Un momento, estamos afinando los detalles…',
    '¡Estamos a un paso de terminar!',
    'Dándole los últimos toques…',
    '¡Prepárate, ya casi estamos listos!',
    'Dale un respiro a tu mouse...',
    '¡Prepárate para la aventura!',
    'Ajustando los últimos detalles…',
    'Cargando sorpresas…',
    '¡Estamos calentando los motores!',
  ];

  public currentMessage = 'Cargando...';
  public showMessage = true;

  ngOnInit(): void {
    console.log('HOLAHOLA');
    setInterval(() => {
      this.showMessage = false;
      setTimeout(() => {
        const randomMessageIndex = this.setRandom();
        this.currentMessage = this.loadingMessages[randomMessageIndex];
        this.showMessage = true;
      }, 500);
    }, 2500);
  }

  private setRandom() {
    return Math.floor(Math.random() * this.loadingMessages.length);
  }
}
