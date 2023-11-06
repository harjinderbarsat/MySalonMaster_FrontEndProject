import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceCategoryModel, ServiceModel } from 'src/app/shared-module/models/servic.model';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentsModel } from 'src/app/shared-module/models/appointments.model';
import { AppointmentsService } from 'src/app/shared-module/service/appointments.service';
import { PaymentService } from 'src/app/shared-module/service/payment.service';
import { Payment } from 'src/app/shared-module/models/payment.model';

@Component({
  selector: 'app-walk-in-payment',
  templateUrl: './walk-in-payment.component.html',
  styleUrls: ['./walk-in-payment.component.css']
})
export class WalkInPaymentComponent implements OnInit {

  constructor(private fb: FormBuilder, private appointmentService: AppointmentsService, private paymentServiec: PaymentService,
    private cService: CommonService, private cookieService: CookieService) { }

  selectedPaymentType: string
  isPaymentDone: boolean
  inProgress: boolean
  subtotal: number;
  tax: number
  total: number
  ifApplyingVoucher: boolean
  ifApplyingCardPayment: boolean

  cardModel: cardModel
  appointmentModel: AppointmentsModel;


  public voucherForm: FormGroup;
  public cardForm: FormGroup;
  ngOnInit() {
    this.appointmentModel = new AppointmentsModel();

    const aponment = this.cService.getCurrentSelectAppointment();
    this.appointmentModel = aponment;
    this.appointmentModel.servicesIds = new Array<number>();
    this.appointmentModel.servicesIds = aponment.servicesIds;

    this.inProgress = false;
    this.selectedPaymentType = 'cash';
    this.isPaymentDone = false;
    this.ifApplyingVoucher = false;
    this.ifApplyingCardPayment = false;
    this.cardModel = new cardModel();

    this.ifVoucherApplied = '';
    this.ifTheVoucherProcessDone = false;
    this.voucherForm = this.fb.group({
      voucher: ['', [Validators.required]],
    });
    this.cardForm = this.fb.group({
      cardNumber: ['', [Validators.required]],
      exDate: ['', [Validators.required]],
      cvc: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      cardName: ['', [Validators.required]],
    });

  }

  paymentType(type) {
    this.selectedPaymentType = type;
  }

  home() {
    window.location.href = window.location.origin + "/#/";
  }

  Proceed() {
    if (this.selectedPaymentType == 'voucher') {
      this.ifApplyingVoucher = true;
    } else if (this.selectedPaymentType == 'card') {
      this.ifApplyingCardPayment = true;
      this.appointmentModel.paymentType = 'card';
    } else if (this.selectedPaymentType == 'cash') {
      this.appointmentModel.paymentType = 'cash';
      this.saveAppointment();
    }
  }

  voucherCode: string
  ifVoucherApplied: string
  voucherMessage: string
  ifTheVoucherProcessDone: boolean

  applyVoucher() {
    if (this.voucherForm.invalid) {
      return;
    }

    if (this.voucherCode == '1234') {
      this.ifVoucherApplied = 'valid';
      this.ifTheVoucherProcessDone = true;
      this.ifApplyingVoucher = false;
      this.cService.getToaster('You got 10% Discount', 'success', 'Congratulations');

    } else {
      this.ifVoucherApplied = 'invalid';
      this.cService.getToaster('invalid Voucher', 'error', 'Error');
    }
  }



  Cancel() {
    this.ifApplyingVoucher = false;
    this.ifApplyingCardPayment = false;
    this.voucherCode = '';
    this.selectedPaymentType = ''
  }

  paymentModel: Payment
  saveAppointment() {
    this.inProgress = true;
    this.appointmentModel.paymentType = this.selectedPaymentType;
    this.appointmentModel.servicesIds = JSON.parse(localStorage.getItem('currentSelectedAppointmentServices'));
    this.appointmentModel.totalAmount = JSON.parse(localStorage.getItem('currentSelectedAppointmentAmount'));

    this.appointmentService.saveAppointment(this.appointmentModel).subscribe(async response => {
      if (response && response.data && response.data.id) {
        this.paymentModel = new Payment();
        this.paymentModel.appointmentId = response.data.id;
        this.paymentModel.clientId = response.data.customerId;
        this.paymentModel.amount = response.data.totalAmount;
        this.paymentModel.status = response.data.paymentType;
        this.paymentModel.type = response.data.payment;
        this.cService.getToaster('Appointment saved succesfully', 'success', 'Success');
        window.location.href = window.location.origin + "/#/walkIn/finalConfirmation/" + this.paymentModel.appointmentId;
        // this.paymentServiec.savePayment(this.paymentModel).subscribe(async response => {
        //   this.cService.getToaster('Appointment saved succesfully', 'success', 'Success');
        //   this.cService.removeCurrentSelectAppointment();
        //   window.location.href = window.location.origin + "/#/walkIn/finalConfirmation";
        //   this.inProgress = false;
        // }, async error => {
        //   this.inProgress = false;
        //   this.cService.getToaster('Application error', 'error', 'Error');
        // });
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }
}

export class cardModel {
  cardNumber: string;
  cvc: string;
  exDate: string;
  cardHolderName: string;
  postCode: string
}