import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressAppointmentsComponent } from './in-progress-appointments.component';

describe('InProgressAppointmentsComponent', () => {
  let component: InProgressAppointmentsComponent;
  let fixture: ComponentFixture<InProgressAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InProgressAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
