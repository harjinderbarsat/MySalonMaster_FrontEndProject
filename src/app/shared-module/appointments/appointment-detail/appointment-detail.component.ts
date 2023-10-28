import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsModel } from '../../models/appointments.model';

 

@Component({
  selector: 'app-branch-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {


  isEditMode: boolean;
  inProgress: boolean;
  id: number;
  appointmentDateTime: NgbDateStruct;
  appointmentStartDateTime: NgbDateStruct;
  appointmentEndDateTime: NgbDateStruct;
  appointment:AppointmentsModel
 

  constructor() { }
  ngOnInit() {
    
  }

 

}
