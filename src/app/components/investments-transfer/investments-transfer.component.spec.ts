import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsLiquidateComponent } from './investments-transfer.component';

describe('InvestmentsLiquidateComponent', () => {
  let component: InvestmentsLiquidateComponent;
  let fixture: ComponentFixture<InvestmentsLiquidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentsLiquidateComponent]
    });
    fixture = TestBed.createComponent(InvestmentsLiquidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
