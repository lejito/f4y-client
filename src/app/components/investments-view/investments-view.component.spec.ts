import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsViewComponent } from './investments-view.component';

describe('InvestmentsViewComponent', () => {
  let component: InvestmentsViewComponent;
  let fixture: ComponentFixture<InvestmentsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentsViewComponent]
    });
    fixture = TestBed.createComponent(InvestmentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
