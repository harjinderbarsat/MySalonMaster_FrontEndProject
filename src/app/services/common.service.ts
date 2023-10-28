import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { LoginModel, User } from '../front-end/models/login.model';
import * as moment from "moment";
import { AppointmentsModel } from '../shared-module/models/appointments.model';
import { BehaviorSubject } from 'rxjs';
import { EmployeeModel } from '../shared-module/models/employee-model.model';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService, private cookieService: CookieService) { }
  rootUrl: string;
  currentLoginUser: User
  currentToken: string;
  currentSelectedAppointment: AppointmentsModel;
  originalUser: EmployeeModel
  ngOnInit() {
    this.setAPIUrl()

  }

  setUserToken(token: string) {
    this.currentToken = token;
  }

  public getUserToken() {
    // Check token in globle variable
    if (this.currentToken == null || this.currentToken == undefined || this.currentToken == '') {
      this.currentToken = this.cookieService.get('token');
      // Check token session storage storage
      if (this.currentToken == null || this.currentToken == undefined || this.currentToken == '') {
        this.currentToken = JSON.parse(localStorage.getItem('token'));
      }
    }
    // Check token local storage
    if (this.currentToken != null && this.currentToken != undefined && this.currentToken != '') {
      return "Bearer " + this.currentToken
    } else {
      window.location.href = window.location.origin + "/#/login";
      return null;
    }
  }

  setAPIUrl() {
    //Testing 
    this.rootUrl = "https://apis.rimpi.app/public/api/"
    // Producation
    //this.rootUrl="https://www.rimpi.app/API/api.hawksystems.app/public/api/"
  }

  setCurrentLoginUser(userInfo: User) {
    this.currentLoginUser = userInfo;
    localStorage.removeItem('userData');
    this.cookieService.delete('userData');
    localStorage.setItem('userData', JSON.stringify(userInfo));
    this.cookieService.set('userData', JSON.stringify(userInfo));
  }

  setOriginalUser(userInfo: EmployeeModel) {
    this.originalUser = userInfo;
    localStorage.removeItem('superAdminUser');
    this.cookieService.delete('superAdminUser');
    localStorage.setItem('superAdminUser', JSON.stringify(userInfo));
    this.cookieService.set('superAdminUser', JSON.stringify(userInfo));
  }

  public getUserProfile(): User {
    if (this.currentLoginUser == null || this.currentLoginUser === undefined) {
      this.currentLoginUser = JSON.parse(localStorage.getItem('userData'));
      if (this.currentLoginUser == null || this.currentLoginUser === undefined) {
        if (this.cookieService.get('userData') != undefined && this.cookieService.get('userData') != null && this.cookieService.get('userData') != "")
          this.currentLoginUser = JSON.parse(this.cookieService.get('userData'));
      }
    }
    console.log(this.currentLoginUser);
    return this.currentLoginUser;
  }

  public getOriginalUserProfile(): EmployeeModel {
    if (this.currentLoginUser == null || this.currentLoginUser === undefined) {
      this.originalUser = JSON.parse(localStorage.getItem('superAdminUser'));
      if (this.originalUser == null || this.originalUser === undefined) {
        if (this.cookieService.get('superAdminUser') != undefined && this.cookieService.get('superAdminUser') != null && this.cookieService.get('superAdminUser') != "")
          this.originalUser = JSON.parse(this.cookieService.get('superAdminUser'));
      }
    }
    return this.originalUser;
  }

  public getToaster(message: string, toasterType: string, header: string) {
    if (toasterType.toLowerCase() === "success") {
      this.toastr.success(message, header);
    }
    else if (toasterType.toLowerCase() === "error") {
      this.toastr.error(message, header);
    }
    else if (toasterType.toLowerCase() === "warning") {
      this.toastr.warning(message, header);
    }
    else if (toasterType.toLowerCase() === "info") {
      this.toastr.info(message, header);
    }
  }

  errorHandle(error: any) {
    if (error != undefined && error != null && error != '') {
      if (error.error != undefined && error.error != null && error.error != '') {
        if (error.error.error != undefined && error.error.error != null && error.error.error != '') {
          if (error.error.error.email != undefined && error.error.error.email != null && error.error.error.email != '') {
            this.toastr.error(error.error.error.email[0], 'Error');

          }
        }
      }
    }
  }

  getStringDateFormatByCurtureAndType(date: any, showTime: boolean) {
    if (date == undefined || date == null || date == "" || date == "Invalid date" || date.toString() == "Invalid Date") {
      return "";
    }

    if (showTime) {
      return moment(date).format("D/MM/YY HH:mm");
    } else {
      return moment(date).format("D/MM/YY");
    }
  }

  getLocalTime(date: any) {
    if (date == undefined || date == null || date == "" || date == "Invalid date" || date.toString() == "Invalid Date") {
      return "";
    }
      return moment(date).format("HH:mm");
  }

  getCurrentDateTime(showTime: boolean) {
    if (showTime) {
      return moment().format("D/MM/YY HH:mm");
    } else {
      return moment().format("D/MM/YY");
    }
  }

  getCurrentSelectAppointment(): AppointmentsModel {
    this.currentSelectedAppointment = JSON.parse(localStorage.getItem('currentSelectedAppointment'));
    if (this.currentSelectedAppointment == null || this.currentSelectedAppointment === undefined) {
      if (this.cookieService.get('currentSelectedAppointment') != undefined && this.cookieService.get('currentSelectedAppointment') != null && this.cookieService.get('currentSelectedAppointment') != "")
        this.currentSelectedAppointment = JSON.parse(this.cookieService.get('currentSelectedAppointment'));
    }
    return this.currentSelectedAppointment;
  }

  setCurrentSelectAppointment(appointmentsModel: AppointmentsModel) {
    if (appointmentsModel != null || appointmentsModel != undefined) {
      localStorage.removeItem('currentSelectedAppointment');
      this.cookieService.delete('currentSelectedAppointment');

      localStorage.setItem('currentSelectedAppointment', JSON.stringify(appointmentsModel));
      this.cookieService.set('currentSelectedAppointment', JSON.stringify(appointmentsModel));
    }
  }

  removeCurrentSelectAppointment() {
    localStorage.removeItem('currentSelectedAppointment');
    this.cookieService.delete('currentSelectedAppointment');
  }

  public download_XLSX(json: any, excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  

}
