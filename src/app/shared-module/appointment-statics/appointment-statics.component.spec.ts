import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentStaticsComponent } from './appointment-statics.component';

describe('AppointmentStaticsComponent', () => {
  let component: AppointmentStaticsComponent;
  let fixture: ComponentFixture<AppointmentStaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentStaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
