import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkInAppointmentTimeComponent } from './walk-in-appointment-time.component';

describe('WalkInAppointmentTimeComponent', () => {
  let component: WalkInAppointmentTimeComponent;
  let fixture: ComponentFixture<WalkInAppointmentTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkInAppointmentTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkInAppointmentTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
