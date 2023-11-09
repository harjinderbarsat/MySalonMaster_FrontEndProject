import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentsModel } from 'src/app/shared-module/models/appointments.model';
import { ServiceCategoryModel, ServiceModel } from 'src/app/shared-module/models/servic.model';
import { AppointmentsService } from 'src/app/shared-module/service/appointments.service';
import { BranchsServiceService } from 'src/app/shared-module/service/branchs-service.service';

@Component({
  selector: 'app-walk-in-appointment-time',
  templateUrl: './walk-in-appointment-time.component.html',
  styleUrls: ['./walk-in-appointment-time.component.css']
})
export class WalkInAppointmentTimeComponent implements OnInit {

  constructor(private appointmentService: AppointmentsService, private cookieService: CookieService, private branchService: BranchsServiceService, private cService: CommonService, private datePipe: DatePipe, private calendar: NgbCalendar, private fb: FormBuilder) { }

  selectedDate: NgbDateStruct;
  hours: string;
  mintues: string;
  amPM: string;
  date: { year: number, month: number };
  appointmentModel: AppointmentsModel;
  onlineBranchId: number;
  public dateForm: FormGroup;
  currentUser: User;
  todayDate: Date = new Date();
  ngOnInit() {
    this.hours = "";
    this.mintues = "";
    this.amPM = "1";
    this.inProgress = false;
    this.dateForm = this.fb.group({
      date: ['', [Validators.required]],
      hours: ['', [Validators.required]],
      mintues: ['', [Validators.required]],
      amPM: ['', [Validators.required]],
    });

    this.getBranchId();
    this.appointmentModel = new AppointmentsModel();
    const aponment = this.cService.getCurrentSelectAppointment();
    this.appointmentModel = aponment;
    this.appointmentModel.servicesIds = new Array<number>();
    this.appointmentModel.servicesIds = aponment.servicesIds;
    this.selectToday();
    this.currentUser = this.cService.getUserProfile();

    setTimeout(() => {
      if (this.currentUser && this.currentUser.branchId) {
        this.inProgress = true;
        this.getBranch(this.currentUser.branchId);
      }
    }, 2000);
  }

  getBranchId() {
    this.onlineBranchId = Number(localStorage.getItem('offlineBranchId'));
    if (!this.onlineBranchId) {
      this.onlineBranchId = Number(this.cookieService.get('offlineBranchId'));
    }
  }

  selectToday() {
    this.selectedDate = this.calendar.getToday();

    let hours = (new Date().getHours() >= 1) && (new Date().getHours() <= 5) ? new Date().getHours()
      : (new Date().getHours() >= 9) && (new Date().getHours() <= 12) ? new Date().getHours() : 9;


    let mintues = (new Date().getMinutes() >= 1) && (new Date().getMinutes() <= 15) ? 15
      : (new Date().getMinutes() > 15) && (new Date().getMinutes() <= 30) ? 30
        : (new Date().getMinutes() > 30) && (new Date().getMinutes() <= 45) ? 45
          : new Date().getMinutes();

    if (mintues > 45) {
      hours = hours + 1;
      mintues = 0;
    }
  }
  slot_for_appointment: number;
  alreadyBookedSlots: number;
  getBranch(branch_id: number) {
    this.branchService.getBranchById(branch_id).subscribe(async response => {
      this.inProgress = false;
      debugger
      if (response && response.data) {
        this.slot_for_appointment = response.data ? response.data.slotForAppointment : 0;
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }
  slotAvaliable: boolean = true;
  // getNumberOfAppointmentForTheSlot() {
  //   this.alreadyBookedSlots = 0;
  //   this.appointmentModel.dateAndTime = this.datePipe.transform(new Date(this.selectedDate.year, (this.selectedDate.month - 1), this.selectedDate.day), 'yyyy-MM-dd');
  //   if (this.currentUser && this.currentUser.branchId) {
  //     this.inProgress = true;
  //     this.branchService.getAppointmentBookedSlot(this.appointmentModel.dateAndTime.toString(), this.hours).subscribe(async response => {
  //       this.inProgress = false;
  //       if (response && response.isSuccess) {
  //         this.alreadyBookedSlots = response.data;
  //         if (this.alreadyBookedSlots < this.slot_for_appointment) {
  //           this.slotAvaliable = true;
  //         } else {
  //           this.slotAvaliable = false;
  //           this.cService.getToaster('kindly change the time', 'error', 'All the slots are booked');
  //         }
  //       } else {
  //         this.cService.getToaster('Application error', 'error', 'Error');
  //       }
  //     }, async error => {
  //       this.inProgress = false;
  //       this.cService.getToaster('Application error', 'error', 'Error');
  //     });
  //   }
  // }

  Proceed() {
    if (!this.hours || this.hours == "") {
      this.cService.getToaster('Kindly select apppointment time first.', 'warning', 'Time Not Found');
      return;
    }

    this.appointmentModel.hours = this.hours;
    this.appointmentModel.mintues = this.mintues;
    this.appointmentModel.amPM = this.amPM;

    this.saveAppointment()
  }

  back() {
    window.location.href = window.location.origin + "/#/walkIn/selectServices";
  }

  inProgress: boolean;
  saveAppointment() {
    this.inProgress = true;
    this.appointmentModel.dateAndTime = this.datePipe.transform(new Date(this.selectedDate.year, (this.selectedDate.month - 1), this.selectedDate.day), 'yyyy-MM-dd');
    this.appointmentModel.servicesIds = JSON.parse(localStorage.getItem('currentSelectedAppointmentServices'));
    this.appointmentModel.totalAmount = JSON.parse(localStorage.getItem('currentSelectedAppointmentAmount'));
    const status = JSON.parse(localStorage.getItem('currentSelectedStatus'));
    if (status == 'online') {
      this.appointmentModel.status = 'online';
      this.appointmentModel.isOnlineAppointment = 'Yes';
    } else {
      this.appointmentModel.isOnlineAppointment = 'No';
    }

    this.appointmentService.saveAppointment(this.appointmentModel).subscribe(async response => {
      if (response && response.data && response.data.id) {
        this.appointmentModel = response.data;
        this.cService.getToaster('Appointment saved succesfully', 'success', 'Success');
        window.location.href = window.location.origin + "/#/branch/upcoming-appointments";
        //window.location.href = window.location.origin + "/#/walkIn/finalConfirmation/" + this.appointmentModel.id;
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }
}
