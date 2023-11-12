import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsLoadComponent } from './savings-load.component';

describe('SavingsLoadComponent', () => {
  let component: SavingsLoadComponent;
  let fixture: ComponentFixture<SavingsLoadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsLoadComponent]
    });
    fixture = TestBed.createComponent(SavingsLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
