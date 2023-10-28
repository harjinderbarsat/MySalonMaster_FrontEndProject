import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentsModel } from 'src/app/shared-module/models/appointments.model';
import { ClientModel } from 'src/app/shared-module/models/client.model';
import { AppointmentsService } from 'src/app/shared-module/service/appointments.service';
import { ClientService } from 'src/app/shared-module/service/client.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  constructor(private fb: FormBuilder,
    public cService: CommonService, private cookieService: CookieService, private clientService: ClientService,
    public appointmentsService: AppointmentsService) { }

  inProgress: boolean
  public searchForm: FormGroup;
  phone: string = ''
  currentAppointment: AppointmentsModel;

  ngOnInit() {
    this.searchForm = this.fb.group({
      mobile: ['', [Validators.required]],
    });
    this.isTheUserSearched = false;
    this.currentAppointment = new AppointmentsModel();
    this.clientInfo = new ClientModel();
  }

  isSerchingDone: boolean;
  clientInfo: ClientModel;

  isTheUserSearched: boolean


  getAppointmentsList() {
    if (!this.phone || this.phone === '') {
      this.cService.getToaster('Kindly enter your mobile number', 'warning', 'Mobile Number Not Found');
      return;
    }
    if (this.phone.length === 10) {
      this.inProgress = true;
      this.appointmentsService.getAppointmentsByMobileForCheckIn(this.phone).subscribe(async response => {
        if (response && response.isSuccess) {
          if (response.data) {
            this.currentAppointment = response.data;
            this.isTheUserSearched = true;
          } else {
            this.cService.getToaster('This feature only for online appointments.', 'info', 'You do not have any Online Appointment');
            window.location.href = window.location.origin + "/#/walkIn/bookAppointment";

          }

        } else {
          this.cService.getToaster('Application error', 'error', 'Error');
        }
        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    } else {
      this.cService.getToaster('Kindly enter correct mobile number', 'warning', 'Mobile Number Incorrect');
    }
  }

  done() {
    this.inProgress = true;
    this.currentAppointment.status = 'upcoming';
    this.appointmentsService.updateAppointment(this.currentAppointment).subscribe(async response => {
      if (response && response.isSuccess) {
        this.cService.getToaster('Your service has been confirmed', 'success', 'Confirmed!')
        window.location.href = window.location.origin + "/#/walkIn/bookAppointment";
      }
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

}
