import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketsAddComponent } from './pockets-add.component';

describe('PocketsAddComponent', () => {
  let component: PocketsAddComponent;
  let fixture: ComponentFixture<PocketsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocketsAddComponent]
    });
    fixture = TestBed.createComponent(PocketsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
