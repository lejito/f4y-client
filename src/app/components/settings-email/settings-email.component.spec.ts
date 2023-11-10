import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEmailComponent } from './settings-email.component';

describe('SettingsEmailComponent', () => {
  let component: SettingsEmailComponent;
  let fixture: ComponentFixture<SettingsEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsEmailComponent]
    });
    fixture = TestBed.createComponent(SettingsEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
