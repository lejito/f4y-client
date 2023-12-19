import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsCdtsComponent } from './investments-cdts.component';

describe('InvestmentsCdtsComponent', () => {
  let component: InvestmentsCdtsComponent;
  let fixture: ComponentFixture<InvestmentsCdtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentsCdtsComponent]
    });
    fixture = TestBed.createComponent(InvestmentsCdtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
