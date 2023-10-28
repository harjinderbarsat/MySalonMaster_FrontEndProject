import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentsModel } from 'src/app/shared-module/models/appointments.model';
import { AppointmentsService } from 'src/app/shared-module/service/appointments.service';

@Component({
  selector: 'app-final-confirmation',
  templateUrl: './final-confirmation.component.html',
  styleUrls: ['./final-confirmation.component.css']
})
export class FinalConfirmationComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, public cService: CommonService, private appointmentService: AppointmentsService) { }
  appointmentModel: AppointmentsModel;
  client_name: string;
  date: string;
  time: string;
  id: number;
  ngOnInit() {
    this.appointmentModel = new AppointmentsModel();
    this.id = this.activeRoute.snapshot.params.id;
    this.getAppointment(this.id);

    setTimeout(function () {

      if (this.appointmentModel.status != 'online' && localStorage.getItem('addedByPanel') == 'yes') {
        localStorage.removeItem('addedByPanel')
        window.location.href = window.location.origin + "/#/branch/upcoming-appointments";
      } else if (this.appointmentModel.status != 'online') {
        window.location.href = window.location.origin + "/#/walkIn/bookAppointment";
      } else {
        window.location.href = window.location.origin + "/#/walkIn/clientRegistration/online";
      }
    }, 10000)

  }

  getAppointment(appointmentId: number) {
    this.appointmentService.getAppointmentById(appointmentId).subscribe(async response => {
      this.appointmentModel = response.data[0];
      this.client_name = this.appointmentModel.customer_name;
      this.date = this.appointmentModel.dateAndTime;
      this.time = this.appointmentModel.hours;


    }, async error => {
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  Proceed() {
    if (this.appointmentModel.status != 'online' && localStorage.getItem('addedByPanel') == 'yes') {
      localStorage.removeItem('addedByPanel')
      window.location.href = window.location.origin + "/#/branch/upcoming-appointments";
    } else if (this.appointmentModel.status != 'online') {
      window.location.href = window.location.origin + "/#/walkIn/bookAppointment";
    } else {
      window.location.href = window.location.origin + "/#/walkIn/BranchSelection?admin_id=" + this.appointmentModel.admin_id;
    }
  }
}
