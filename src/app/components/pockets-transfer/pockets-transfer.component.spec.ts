import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketsTransferComponent } from './pockets-transfer.component';

describe('PocketsTransferComponent', () => {
  let component: PocketsTransferComponent;
  let fixture: ComponentFixture<PocketsTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocketsTransferComponent]
    });
    fixture = TestBed.createComponent(PocketsTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
