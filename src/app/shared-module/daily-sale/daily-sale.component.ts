import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import { cashMovementSummary, Payment, transactionSummary } from '../models/payment.model';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-daily-sale',
  templateUrl: './daily-sale.component.html',
  styleUrls: ['./daily-sale.component.css']
})
export class DailySaleComponent implements OnInit {

  payments: Array<Payment>
  constructor(public cService: CommonService, private datePipe: DatePipe, private paymentService: PaymentService) { }
  inProgress: boolean
  currentUser: User
  cashMovement: cashMovementSummary
  transaction: transactionSummary
  currentPageNumber: number
  itemsPer: number;
  appointmentDateTime: NgbDateStruct;
  dateFilter: string

  ngOnInit() {
    this.inProgress = false;
    this.payments = new Array<Payment>();
    this.cashMovement = new cashMovementSummary();
    this.transaction = new transactionSummary();
    this.currentPageNumber = 1;
    this.itemsPer = 10;
    this.currentUser = this.cService.getUserProfile();
    let currentDate = new Date();
    this.appointmentDateTime = new NgbDate(currentDate.getFullYear(), (currentDate.getMonth() + 1), currentDate.getDate());
    this.getALLPaymentList(this.appointmentDateTime);
  }

  getALLPaymentList(event) {
    this.inProgress = true;
    this.payments = new Array<Payment>();
    this.cashMovement = new cashMovementSummary();
    this.transaction = new transactionSummary();

    if (event != null && event != undefined) {
      this.dateFilter = this.datePipe.transform(new Date(event.year, (event.month - 1), event.day), 'yyyy-MM-dd');
    }

    this.paymentService.getALLPaymentList(this.dateFilter).subscribe(async response => {
      this.inProgress = false;

      if (response && response.isSuccess) {
        if (response.data && response.data.length > 0) {
          this.payments = response.data;
          this.payments.forEach(p => {
            if (p.payFor == 'product') {
              this.transaction.productSaleCount = Number(this.transaction.productSaleCount) + 1;
              this.transaction.productSaleAmmount = Number(this.transaction.productSaleAmmount) + Number(p.amount);
            } else if (p.payFor == 'appointment') {
              this.transaction.appoinmentsCount = Number(this.transaction.appoinmentsCount) + 1;
              this.transaction.appoinmentsAmmount = Number(this.transaction.appoinmentsAmmount) + Number(p.amount);
            }
            this.transaction.totalSale = Number(this.transaction.totalSale) + Number(p.amount);
            this.cashMovement.CashAmmount = Number(this.cashMovement.CashAmmount) + Number(p.cashPaid);
            this.cashMovement.cardAmmount = Number(this.cashMovement.cardAmmount) + Number(p.cardPaid);
            this.cashMovement.totalSale = Number(this.cashMovement.totalSale) + Number(p.amount);
            p.payFor = p.payFor && p.payFor != '' ? p.payFor.toLocaleUpperCase() : '';
          })
        } else {
          //this.cService.getToaster('Data does not exists', 'info', 'No Data Found');
        }

      } else {
        this.cService.getToaster('Application error', 'error', 'Error');
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

}
