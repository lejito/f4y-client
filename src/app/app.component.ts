import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private loadingService: LoadingService) {}

  public title = 'F4Y';
  public isLoading = true;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
