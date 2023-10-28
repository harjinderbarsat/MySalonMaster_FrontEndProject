import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkInPaymentComponent } from './walk-in-payment.component';

describe('WalkInPaymentComponent', () => {
  let component: WalkInPaymentComponent;
  let fixture: ComponentFixture<WalkInPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkInPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkInPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
