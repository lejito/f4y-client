import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css']
})
export class SavingsComponent {
  constructor(private title: Title) {
    this.title.setTitle('Fin4Youth: Cuenta de ahorros');
  }
}
