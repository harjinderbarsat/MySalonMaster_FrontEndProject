import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeAttendance, EmployeeModel } from '../models/employee-model.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http: HttpClient, public commonService: CommonService) { }

  public getEmployeeList(): Observable<ResponseModel<Array<EmployeeModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<EmployeeModel>>>(this.commonService.rootUrl + 'getEmployeeList', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getEmployeeById(employee_id: number): Observable<ResponseModel<EmployeeModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<EmployeeModel>>(this.commonService.rootUrl + 'getEmployeeById?employeeId=' + employee_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getEmployeeByEmpCode(employeeCode: string): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'getEmployeeByEmpCode?employeeCode=' + employeeCode, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public saveEmployee(employeeData: EmployeeModel): Observable<ResponseModel<EmployeeModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<EmployeeModel>>(this.commonService.rootUrl + 'saveEmployee', employeeData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateEmployee(employeeData: EmployeeModel): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'updateEmployee', employeeData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteEmployee(employee_id: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteEmployee?employee_id=' + employee_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }


  public getMyProfileDetail(): Observable<ResponseModel<EmployeeModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<EmployeeModel>>(this.commonService.rootUrl + 'getMyProfile', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateMyProfileDetail(employeeData: EmployeeModel): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'updateMyProfile', employeeData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteMultipleEmployee(selectedIds: Array<number>): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteEmployees', { 'id': selectedIds }, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public checkIn(attendanceData: EmployeeAttendance): Observable<ResponseModel<EmployeeAttendance>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<EmployeeAttendance>>(this.commonService.rootUrl + 'checkIn', attendanceData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateAttendance(attendace: EmployeeAttendance): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'updateAttendance', attendace, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public checkOut(attendanceData: EmployeeAttendance): Observable<ResponseModel<EmployeeAttendance>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<EmployeeAttendance>>(this.commonService.rootUrl + 'checkOut', attendanceData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  public getAttendanceRecordsByEmployeeId(employee_id: number): Observable<ResponseModel<Array<EmployeeAttendance>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<EmployeeAttendance>>>(this.commonService.rootUrl + 'getAttendanceRecordByEmployeeCode?employee_id=' + employee_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  public deleteAttendance(attendanceRecordId: string): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteAttendance?id=' + attendanceRecordId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  public getAttendanceRecordList(): Observable<ResponseModel<Array<EmployeeAttendance>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<EmployeeAttendance>>>(this.commonService.rootUrl + 'getAttendanceRecordList', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

}
