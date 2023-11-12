import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-savings-load',
  templateUrl: './savings-load.component.html',
  styleUrls: ['./savings-load.component.css'],
})
export class SavingsLoadComponent implements OnInit {
  @Input({ required: true }) cuenta!: string;
  @Output() closeDialog = new EventEmitter();

  public enlaceQuyneApp = 'https://quyneapp.vercel.app/login?f4y=';

  ngOnInit(): void {
    this.enlaceQuyneApp = this.enlaceQuyneApp + this.cuenta;
  }

  public cerrar(): void {
    this.closeDialog.emit();
  }
}
