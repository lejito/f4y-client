import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsIdentityComponent } from './settings-identity.component';

describe('SettingsIdentityComponent', () => {
  let component: SettingsIdentityComponent;
  let fixture: ComponentFixture<SettingsIdentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsIdentityComponent]
    });
    fixture = TestBed.createComponent(SettingsIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
