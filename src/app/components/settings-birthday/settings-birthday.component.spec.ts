import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsBirthdayComponent } from './settings-birthday.component';

describe('SettingsBirthdayComponent', () => {
  let component: SettingsBirthdayComponent;
  let fixture: ComponentFixture<SettingsBirthdayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsBirthdayComponent]
    });
    fixture = TestBed.createComponent(SettingsBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
