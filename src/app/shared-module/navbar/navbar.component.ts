import { Component, Output, EventEmitter, OnInit } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/front-end/services/login.service';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from '../service/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/front-end/models/login.model';
import { EmployeeAttendance } from '../models/employee-model.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentLang = "en";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  public isCollapsed = true;
  layoutSub: Subscription;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();
  currentUser: User;
  public config: any = {};

  constructor(private cookieService: CookieService, private loginService: LoginService, public commonService: CommonService
    , private employeeService: EmployeeService, private modalService: NgbModal) {
  }
  isBranchPannel: boolean;
  ngOnInit() {
    this.isCollapsed = false;
    this.currentUser = this.commonService.getUserProfile();
    this.isBranchPannel = this.currentUser.userType == 'branch';
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName("app-sidebar")[0];
    if (appSidebar.classList.contains("hide-sidebar")) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }

  logout() {

    this.loginService.logout().subscribe(async response => {
      this.commonService.setUserToken('');
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      this.cookieService.delete('token');
      this.cookieService.delete('userData');
      localStorage.removeItem('offlineBranchId');
      window.location.href = window.location.origin + "/#/login";
    }, async error => {

      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      localStorage.removeItem('offlineBranchId');
      this.cookieService.delete('token');
      this.cookieService.delete('userData');
      window.location.href = window.location.origin + "/#/login";
    });
  }


  employeeUniqueId: string;
  checkInOutstatus: string;
  employeeReport: EmployeeAttendance = null;
  checkInOutOpenModal(content, status: string) {
    this.isCheckOutDone = false;
    this.isTheCashDifference = false;
    this.ifAmmountDifferenceDone = false;

    this.employeeReport = null;
    this.employeeUniqueId = '';
    this.checkInOutstatus = status;
    this.modalService.open(content, { size: "xs", backdrop: "static" });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  checkOutLoading: boolean = false;

  totalProductAmmont: number = 0;
  totalAppointmentAmmont: number = 0;
  grandTotalAppointment: number = 0;
  totalCash: number = 0;
  totalCard: number = 0;
  isTheCashDifference: boolean = false;
  isCheckOutDone: boolean = false;

  checkInOut() {
    this.employeeReport = new EmployeeAttendance();
    let currentDate = new Date();

    this.totalProductAmmont = 0;
    this.totalAppointmentAmmont = 0;
    this.grandTotalAppointment = 0;

    this.totalCard = 0;
    this.totalCash = 0;

    if (this.employeeUniqueId && this.employeeUniqueId != '') {
      this.checkOutLoading = true;
      this.employeeReport.employeeCode = this.employeeUniqueId;

      this.employeeReport.date = currentDate.getDate() + '' + currentDate.getMonth() + '' + currentDate.getFullYear();
      this.employeeReport.checkIn = new Date().toLocaleTimeString();
      this.employeeReport.checkOut = new Date().toLocaleTimeString();

      this.employeeService.checkIn(this.employeeReport).subscribe(async response => {
        if (response.isSuccess) {
          this.checkOutLoading = false;
          this.commonService.getToaster(response.message, 'success', 'Success');

          if (response.message == 'Checked In successfully.') {
            this.modalService.dismissAll();
          } else {

            this.employeeReport = response.data;
            this.totalProductAmmont = Number(this.employeeReport.productCardCollection) + Number(this.employeeReport.productCashCollection);
            this.totalAppointmentAmmont = Number(this.employeeReport.appointmentCardCollection) + Number(this.employeeReport.appointmentCashCollection);
            this.grandTotalAppointment = this.totalProductAmmont + this.totalAppointmentAmmont;

            this.totalCard = Number(this.employeeReport.productCardCollection) + Number(this.employeeReport.appointmentCardCollection);
            this.totalCash = Number(this.employeeReport.appointmentCashCollection) + Number(this.employeeReport.productCashCollection);
            this.isCheckOutDone = true;
          }
        } else {
          this.commonService.getToaster(response.message, 'warning', '');
        }
      }, async error => {
        this.commonService.getToaster('Application error', 'error', 'Error');
      });

    } else {
      this.commonService.getToaster('Kindly enter a valid Employee Code', 'error', 'Invalid Employee Code');
    }
  }

  addAppointment() {
    localStorage.setItem('addedByPanel', 'yes')
    window.open(
      window.location.origin + "/#/walkIn/clientRegistration/offline",
      '_blank' // <- This is what makes it open in a new window.
    );

  }

  ifAmmountDifferenceDone: boolean = false;
  updateAttendance() {
    if (!this.employeeReport.reasonMessage || this.employeeReport.reasonMessage == '') {
      this.commonService.getToaster('Kindy enter a reason not of difference', 'warning', 'Enter Reason');
    } else {
      if (this.employeeReport.difference < 0) {
        this.employeeReport.isNegtiveDifference = true;
        this.employeeReport.isPosotiveDifference = false;
      } else if (this.employeeReport.difference > 0) {
        this.employeeReport.isPosotiveDifference = true;
        this.employeeReport.isNegtiveDifference = false;
      }
      this.employeeService.updateAttendance(this.employeeReport).subscribe(async response => {
        this.ifAmmountDifferenceDone = true;
        if (response.isSuccess) {
          this.commonService.getToaster('Updated Info succesfully', 'success', 'Success');
        } else {
          this.commonService.getToaster(response.message, 'warning', '');
        }
      }, async error => {
        this.commonService.getToaster('Application error', 'error', 'Error');
      });
    }
  }

  getActualAmt(grandTotalAppointment: number, difference: number): number {
    return Number(grandTotalAppointment) + Number(difference);
  }
}
