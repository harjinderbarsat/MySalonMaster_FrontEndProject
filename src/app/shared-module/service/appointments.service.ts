import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentsModel } from '../models/appointments.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(public http: HttpClient, public commonService: CommonService) { }

  public getAppointmentsList(): Observable<ResponseModel<Array<AppointmentsModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<AppointmentsModel>>>(this.commonService.rootUrl + 'getAppointmentsList', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getAppointmentsListByfilter(filter: AppointmentsModel): Observable<ResponseModel<Array<AppointmentsModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<Array<AppointmentsModel>>>(this.commonService.rootUrl + 'getFilterAppointments', filter, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getAppointmentById(appointmentsId: number): Observable<ResponseModel<AppointmentsModel>> {
    let currentUser = this.commonService.getUserProfile();
    let url = this.commonService.rootUrl + 'getAppointmentById?appointmentsId=' + appointmentsId;
    if (currentUser) {
      url += (currentUser.userType == 'admin' ? ("&admin_id=" + currentUser.id) : ('&branch_id=' + currentUser.branchId));
    }
    else {
      let branch_id = localStorage.getItem('offlineBranchId');
      url += ('&branch_id=' + branch_id);
    }
    return this.http.get<ResponseModel<AppointmentsModel>>(url);
  }

  public getAppointmentsByMobileForFeedback(mobile: number): Observable<ResponseModel<Array<AppointmentsModel>>> {
    return this.http.get<ResponseModel<Array<AppointmentsModel>>>(this.commonService.rootUrl + 'getAppointmentsByMobileForFeedback?mobile=' + mobile);
  }

  public getAppointmentsByMobileForCheckIn(mobile: string): Observable<ResponseModel<AppointmentsModel>> {
    return this.http.get<ResponseModel<AppointmentsModel>>(this.commonService.rootUrl + 'getAppointmentByMobileForCheckout?mobile=' + mobile);
  }

  public saveAppointment(appointmentsData: AppointmentsModel): Observable<ResponseModel<AppointmentsModel>> {
    let currentUser = this.commonService.getUserProfile();
    if (currentUser) {
      if (currentUser.userType == 'admin') {
        appointmentsData.adminId = currentUser.id;
      }
      else {
        appointmentsData.branchId = currentUser.branchId;
      }
    }
    else {
      let branch_id = localStorage.getItem('offlineBranchId');
      if (branch_id && branch_id.length > 0) {
        appointmentsData.branchId = parseInt(branch_id);
      }
    }
    return this.http.post<ResponseModel<AppointmentsModel>>(this.commonService.rootUrl + 'saveAppointment', appointmentsData);
  }

  public updateAppointment(appointmentsData: AppointmentsModel): Observable<ResponseModel<AppointmentsModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<AppointmentsModel>>(this.commonService.rootUrl + 'updateAppointment', appointmentsData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteAppointment(appointmentsId: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteAppointment?appointmentsId=' + appointmentsId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteMultipleAppointment(selectedIds: Array<number>): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteAppointments', { 'id': selectedIds }, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

}
