import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsUnloadComponent } from './savings-unload.component';

describe('SavingsUnloadComponent', () => {
  let component: SavingsUnloadComponent;
  let fixture: ComponentFixture<SavingsUnloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsUnloadComponent]
    });
    fixture = TestBed.createComponent(SavingsUnloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
