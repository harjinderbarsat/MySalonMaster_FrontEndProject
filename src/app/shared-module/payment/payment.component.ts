import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentsModel, paymentStatus } from '../models/appointments.model';
import { AppointmentsService } from '../service/appointments.service';
import { User } from 'src/app/front-end/models/login.model';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { ClientService } from '../service/client.service';
import { ClientModel } from '../models/client.model';
import { DatePipe } from '@angular/common';
import { PaymentService } from '../service/payment.service';
import { Payment } from '../models/payment.model';
import Swal from 'sweetalert2';
import { ProductSaleSaleService } from '../service/product-sale.service';
import { ProductSaleModel } from '../models/product-sale-model';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('divInvoice', { static: false }) pdfTable: ElementRef;
  constructor(private productSaleService: ProductSaleSaleService, private paymentService: PaymentService, private datePipe: DatePipe, private clientService: ClientService, private employeeService: EmployeeService, private activeRoute: ActivatedRoute, private modalService: NgbModal, public cService: CommonService, public appointmentsService: AppointmentsService) {
  }
  inProgress: boolean
  showFilter: boolean = false;
  selectedAppointment: AppointmentsModel;
  clientDetails: ClientModel;
  currentUser: User
  id: number;
  paymentFor: string;

  @ViewChild('invoicePrintMpdal', { static: false }) private invoicePrintMpdal: TemplateRef<any>;

  ngOnInit() {
    this.inProgress = true;
    this.selectedAppointment = new AppointmentsModel();
    this.clientDetails = new ClientModel();
    this.currentUser = new User();
    this.currentUser = this.cService.getUserProfile();

    this.id = this.activeRoute.snapshot.params.id;
    this.paymentFor = this.activeRoute.snapshot.params.type;

    if (this.paymentFor == 'product') {
      this.getProductDetails();
    } else {
      this.getAppointmentDetails();
    }
  }

  getAppointmentDetails() {
    this.modalService.dismissAll();
    this.appointmentsService.getAppointmentById(this.id).subscribe(async response => {
      if (response && response.isSuccess && response.data) {
        this.selectedAppointment = response.data[0];
        this.getClientDetails(this.selectedAppointment.customerId);
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  productDetails: ProductSaleModel
  getProductDetails() {
    this.productDetails = new ProductSaleModel();
    this.modalService.dismissAll();
    this.productSaleService.getProductSaleById(this.id).subscribe(async response => {
      if (response && response.isSuccess && response.data) {
        this.productDetails = response.data;
        this.getClientDetails(this.productDetails.client_id);
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  getClientDetails(id) {
    this.clientService.getClientById(id).subscribe(async response => {
      this.clientDetails = response.data;
      this.getPaymentDetails();
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Somthing went wrong', 'error', 'Error');
    });
  }

  currentlyPayFor: string;
  paymentTransactionPopUp(content, type) {
    this.currentlyPayFor = type;
    if (this.ifTheCashPaymentDone) {
      this.PaymentModel.card_paid = this.PaymentModel.pending_amount;
    } else if (this.ifTheCardPaymentDone) {
      this.PaymentModel.cash_paid = this.PaymentModel.pending_amount;
    }

    this.modalService.open(content, { size: "sm", backdrop: "static" });
  }

  PaymentModel: Payment;
  PaymentFilter: Payment;
  ifTheCashPaymentDone: boolean = false;
  ifTheCardPaymentDone: boolean = false;
  getPaymentDetails(showSuccess = false) {
    this.PaymentModel = new Payment();
    this.PaymentFilter = new Payment();
    this.PaymentFilter.pay_for = this.paymentFor;

    if (this.paymentFor == 'appointment') {

      this.PaymentFilter.appointmentId = this.id;

    } else if (this.paymentFor == 'product') {
      this.PaymentFilter.pay_for = this.paymentFor;
      this.PaymentFilter.product_sale_id = this.id;
    }
    this.paymentService.getPaymentByFilters(this.PaymentFilter).subscribe(async response => {
      if (response && response.isSuccess && response.data) {
        this.PaymentModel = response.data[0];

        if (this.paymentFor == 'appointment') {
          this.PaymentModel.amount = this.selectedAppointment.totalAmount;

        } else if (this.paymentFor == 'product') {
          this.PaymentModel.amount = this.productDetails.total_amount;
        }
        this.PaymentModel.pending_amount = Number(this.PaymentModel.amount) - (Number(Number(this.PaymentModel.cash_paid) + Number(this.PaymentModel.card_paid)));
        if (this.PaymentModel.pending_amount <= 0 && showSuccess) {
          this.paymentCompleted();
        }

      } else {
        if (this.paymentFor == 'appointment') {
          this.PaymentModel.amount = this.selectedAppointment.totalAmount;
          this.PaymentModel.pending_amount = this.selectedAppointment.totalAmount;
        } else if (this.paymentFor == 'product') {
          this.PaymentModel.amount = this.productDetails.total_amount;
          this.PaymentModel.pending_amount = this.productDetails.total_amount;
        }
        this.PaymentModel.card_paid = 0;
        this.PaymentModel.cash_paid = 0;
      }

      this.ifTheCashPaymentDone = this.PaymentModel.cash_paid != 0;
      this.ifTheCardPaymentDone = this.PaymentModel.card_paid != 0;

      this.inProgress = false;

    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Somthing went wrong', 'error', 'Error');
    });
  }

  paymentCompleted() {
    Swal.fire({
      title: 'Success',
      text: 'Payment done successfully.',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Invoice',
      cancelButtonText: 'Close'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.genInvoice(this.invoicePrintMpdal);
        } else {
          if (this.paymentFor == 'appointment')
            window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/in-progress-appointments";
          else if (this.paymentFor == 'product')
            window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/product-sale-history";

        }
      });
  }

  paymentTransaction() {
    this.PaymentModel.pay_for = this.paymentFor;
    this.inProgress = true;
    if (this.paymentFor == 'appointment') {
      this.PaymentModel.appointmentId = this.id;
      this.PaymentModel.employee_id = this.selectedAppointment.assignToId;
      this.PaymentModel.client_id = this.selectedAppointment.customerId;
    } else if (this.paymentFor == 'product') {

      this.PaymentModel.client_id = this.productDetails.client_id;
      this.PaymentModel.product_sale_id = this.id;
      this.PaymentModel.amount = this.productDetails.total_amount;
      this.PaymentModel.employee_id = this.productDetails.sold_by_id;

    }

    this.modalService.dismissAll();

    if (this.PaymentModel.id) {
      this.paymentService.updatePayment(this.PaymentModel).subscribe(async response => {
        if (response && response.isSuccess) {
          this.cService.getToaster('Payment Updated', 'success', 'Success');
          this.getPaymentDetails(true);
        }
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Somthing went wrong', 'error', 'Error');
      });
    } else {
      this.paymentService.addPayment(this.PaymentModel).subscribe(async response => {
        if (response && response.isSuccess) {
          this.cService.getToaster('Payment Done', 'success', 'Success');

          this.getPaymentDetails(true);
        }
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Somthing went wrong', 'error', 'Error');
      });
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  closeInvoiceModal() {
    this.modalService.dismissAll();
    if (this.paymentFor == 'appointment')
      window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/in-progress-appointments";
    else if (this.paymentFor == 'product')
      window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/product-sale-history";

  }

  genInvoice(invoicePrintMpdal) {
    this.modalService.open(invoicePrintMpdal, { size: "md", backdrop: "static" });
  }

  printInvoice() {
    let printContents, popupWin;
    printContents = document.getElementById('divInvoice').innerHTML;
    popupWin = window.open('', '_blank',
      'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
      <head>
          <style></style>
      </head>
      <body>
        ${printContents}
      </body>
      </html>
     `);
    popupWin.print();
    popupWin.close();
  }

  generatePDF() {
    try {
      const documentDefinition = this.getDocumentDefinition();
      pdfMake.createPdf(documentDefinition).open();
    } catch (ex) {
      this.cService.getToaster('Somthing went wrong. Please try again later.', 'error', 'Error');
    }

  }

  getDocumentDefinition() {

    let header1 = "";
    if (this.paymentFor == 'product') {
      header1 = "Invoice No.: 0001\n";
      header1 += " ISSUED: " + this.cService.getCurrentDateTime(true) + "\n";
      header1 += " DUE: " + this.cService.getStringDateFormatByCurtureAndType(this.productDetails.created_at, true);
    }
    else if (this.paymentFor == 'appointment') {
      header1 = "Invoice No.: 0001\n";
      header1 += " ISSUED: " + this.cService.getCurrentDateTime(true) + "\n";
      header1 += " STARTED AT: " + this.cService.getStringDateFormatByCurtureAndType(this.selectedAppointment.startedAt, true) + "\n";
      header1 += " COMPLETED AT: " + this.cService.getStringDateFormatByCurtureAndType(this.selectedAppointment.completedAt, true);
    }

    let itemsTable = [];

    if (this.paymentFor == 'product') {
      itemsTable.push(['ITEM DESCRIPTION', 'QTY', 'PRICE', 'TOTAL']);
      itemsTable.push(['', '', '', '']);
      itemsTable.push([{ text: '', fillColor: '#dfdfdf' }, { text: '', fillColor: '#dfdfdf' }, { text: '', fillColor: '#dfdfdf' }, { text: '', fillColor: '#dfdfdf' }]);
      itemsTable.push(['', '', '', '']);
      this.productDetails.products.forEach(element => {
        itemsTable.push([element.productName, '' + element.qty, '$' + element.price, '$' + element.total_amount]);
      });
      itemsTable.push(['', '', '', '']);
      itemsTable.push([{ text: '', fillColor: '#dfdfdf' }, { text: '', fillColor: '#dfdfdf' }, { text: '', fillColor: '#dfdfdf' }, { text: '', fillColor: '#dfdfdf' }]);
      itemsTable.push(['', '', '', '']);
      itemsTable.push(['', '', 'SUB TOTAL', '$' + this.productDetails.total_amount]);
      itemsTable.push(['', '', 'TAX', '$0.00']);
      itemsTable.push(['', '', 'GRAND TOTAL', '$' + this.productDetails.total_amount]);
    }
    else if (this.paymentFor == 'appointment') {
      itemsTable.push(['ITEM DESCRIPTION', '', '', 'PRICE']);
      itemsTable.push(['', '', '', '']);
      itemsTable.push([{ text: '', fillColor: '#dfdfdf' }, { text: '', fillColor: '#dfdfdf' }, { text: '', fillColor: '#dfdfdf' }, { text: '', fillColor: '#dfdfdf' }]);
      itemsTable.push(['', '', '', '']);
      itemsTable.push([this.selectedAppointment.services_name, '', '', '$' + this.selectedAppointment.totalAmount]);
      itemsTable.push(['', '', '', '']);
      itemsTable.push([{ text: '', fillColor: '#dfdfdf' }, { text: '', fillColor: '#dfdfdf' }, { text: '', fillColor: '#dfdfdf' }, { text: '', fillColor: '#dfdfdf' }]);
      itemsTable.push(['', '', '', '']);
      itemsTable.push(['', '', 'SUB TOTAL', '$' + this.selectedAppointment.totalAmount]);
      itemsTable.push(['', '', 'TAX', '$0.00']);
      itemsTable.push(['', '', 'GRAND TOTAL', '$' + this.selectedAppointment.totalAmount]);
    }




    return {
      content: [
        {
          text: 'INVOICE',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          table: {
            headerRows: 0,
            widths: ['*', 50, 50, '*'],
            body: [
              [{ text: '', width: '60%' }, '', '', "Reciept Date: " + this.cService.getCurrentDateTime(true) + "\nReciept No.: " + this.PaymentModel.id + " \n\n\n\n"],
              ["From", '', '', "To"],
              [(this.currentUser.admin ? this.currentUser.admin + "\n" : '') + (this.currentUser.name ? this.currentUser.name : '') + "\n" + (this.currentUser.email ? this.currentUser.email : '') + '', '', '', this.clientDetails.name + "\n" + this.clientDetails.email + "\n" + this.clientDetails.mobile + "\n\n"]
            ],

            border: 0
          },
          layout: 'noBorders'
        },
        {
          table: {
            headerRows: 1,
            widths: [240, 75, '*', '*'],
            body: itemsTable
          },
          layout: 'noBorders'
        },
        {
          table: {
            headerRows: 0,
            widths: ['*', 100, 100, '*'],
            body: [
              ['\n\n\n\n', '', '', ''],
              ["Payment Method\n" + (this.ifTheCashPaymentDone ? "Cash :" + this.PaymentModel.cash_paid + "\n" : "") + (this.ifTheCardPaymentDone ? "Card :" + this.PaymentModel.card_paid + "" : ""), '', '', ""]

            ]
          },
          layout: 'noBorders'
        },
        {
          text: 'Thank You',
          bold: true,
          fontSize: 14,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
      ],
      styles: {
        name: {
          fontSize: 16,
          bold: true
        }
      }
    };
  }

  checkAmountValidations() {

    if (this.currentlyPayFor == 'cash' && this.PaymentModel.cash_paid > this.PaymentModel.pending_amount) {
      return true;
    }
    else if (this.currentlyPayFor == 'card' && this.PaymentModel.card_paid > this.PaymentModel.pending_amount) {
      return true;
    }
    else return false;
  }
}
