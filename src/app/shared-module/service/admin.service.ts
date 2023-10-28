import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeModel } from '../models/employee-model.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient, public commonService: CommonService) { }

  public getAdminList(): Observable<ResponseModel<Array<EmployeeModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<EmployeeModel>>>(this.commonService.rootUrl + 'getAdminList', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getAdminDetail(employee_id: number): Observable<ResponseModel<EmployeeModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<EmployeeModel>>(this.commonService.rootUrl + 'getAdminDetail?adminId=' + employee_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }


  public saveAdmin(employeeData: EmployeeModel): Observable<ResponseModel<EmployeeModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<EmployeeModel>>(this.commonService.rootUrl + 'saveAdmin', employeeData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateAdmin(employeeData: EmployeeModel): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'updateAdmin', employeeData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteAdmin(employee_id: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteAdmin?admin_id=' + employee_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }


  
  public deleteMultipleAdmins(selectedIds: Array<number>): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteMultipleAdmin', { 'id': selectedIds }, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
}
