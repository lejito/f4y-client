import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UtilsService } from './services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private utilsService: UtilsService, private cd: ChangeDetectorRef) {}

  public title = 'F4Y';
  public isLoading = true;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.utilsService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
