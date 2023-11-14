import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketsEditComponent } from './pockets-edit.component';

describe('PocketsEditComponent', () => {
  let component: PocketsEditComponent;
  let fixture: ComponentFixture<PocketsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocketsEditComponent]
    });
    fixture = TestBed.createComponent(PocketsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
