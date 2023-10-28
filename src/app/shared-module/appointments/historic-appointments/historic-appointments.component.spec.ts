import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricAppointmentsComponent } from './historic-appointments.component';

describe('HistoricAppointmentsComponent', () => {
  let component: HistoricAppointmentsComponent;
  let fixture: ComponentFixture<HistoricAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
