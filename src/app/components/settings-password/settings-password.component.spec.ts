import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPasswordComponent } from './settings-password.component';

describe('SettingsPasswordComponent', () => {
  let component: SettingsPasswordComponent;
  let fixture: ComponentFixture<SettingsPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPasswordComponent]
    });
    fixture = TestBed.createComponent(SettingsPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
