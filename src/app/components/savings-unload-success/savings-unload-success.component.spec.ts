import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsUnloadSuccessComponent } from './savings-unload-success.component';

describe('SavingsUnloadSuccessComponent', () => {
  let component: SavingsUnloadSuccessComponent;
  let fixture: ComponentFixture<SavingsUnloadSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsUnloadSuccessComponent]
    });
    fixture = TestBed.createComponent(SavingsUnloadSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
