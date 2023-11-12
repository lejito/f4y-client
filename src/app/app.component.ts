import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from './services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private utilsService: UtilsService) {}

  public title = 'F4Y';
  public isLoading = true;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.utilsService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
