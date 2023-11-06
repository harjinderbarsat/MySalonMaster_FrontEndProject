import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import { Payment } from '../models/payment.model';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-appointment-statics',
  templateUrl: './appointment-statics.component.html',
  styleUrls: ['./appointment-statics.component.css']
})
export class AppointmentStaticsComponent implements OnInit {

  payments: Array<Payment>
  constructor(public cService: CommonService, private datePipe: DatePipe, private paymentService: PaymentService) { }
  inProgress: boolean
  currentUser: User
  dateFilter: string
  appointmentDateTime: NgbDateStruct;


  ngOnInit() {
    this.inProgress = false;
    this.payments = new Array<Payment>();
    this.currentUser = this.cService.getUserProfile();
    let currentDate = new Date();
    this.appointmentDateTime = new NgbDate(currentDate.getFullYear(), (currentDate.getMonth() + 1), currentDate.getDate());
    this.getAppointmentPaymentList(this.appointmentDateTime);
  }

  getAppointmentPaymentList(event) {
    this.inProgress = true;
    if (event != null && event != undefined) {
      this.dateFilter = this.datePipe.transform(new Date(event.year, (event.month - 1), event.day), 'yyyy-MM-dd');
    }

    this.paymentService.getALLPaymentList(this.dateFilter).subscribe(async response => {
      this.payments = new Array<Payment>();
      if (response && response.data && response.data.length && response.data.length > 0) {
        response.data.forEach(p => {
          if (p.payFor == 'appointment') {
            this.payments.push(p)
          }
        })
      }
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  downloadXslx(): void {
    let element = document.getElementById('table-xsls');
    this.cService.download_XLSX(element, 'Appointments Statics List')
  }

}
