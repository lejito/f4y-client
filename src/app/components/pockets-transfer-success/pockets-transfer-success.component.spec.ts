import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketsTransferSuccessComponent } from './pockets-transfer-success.component';

describe('PocketsTransferSuccessComponent', () => {
  let component: PocketsTransferSuccessComponent;
  let fixture: ComponentFixture<PocketsTransferSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocketsTransferSuccessComponent]
    });
    fixture = TestBed.createComponent(PocketsTransferSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
