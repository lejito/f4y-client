import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketsRecordComponent } from './pockets-record.component';

describe('PocketsRecordComponent', () => {
  let component: PocketsRecordComponent;
  let fixture: ComponentFixture<PocketsRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocketsRecordComponent]
    });
    fixture = TestBed.createComponent(PocketsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
