import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import { CommonService } from 'src/app/services/common.service';
import { LeavesModel } from '../models/leaves.model';

@Injectable({
  providedIn: 'root'
})
 
export class LeavesService {

  constructor(public http: HttpClient, public commonService: CommonService) { }
  public getLeavesList(): Observable<ResponseModel<Array<LeavesModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<LeavesModel>>>(this.commonService.rootUrl + 'getAllLeavesList', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getLeavesById(leaveId: number): Observable<ResponseModel<LeavesModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<LeavesModel>>(this.commonService.rootUrl + 'getLeavesById?leavesId=' + leaveId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  public getLeavesByEmployee(employee_id: number): Observable<ResponseModel<Array<LeavesModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<LeavesModel>>>(this.commonService.rootUrl + 'getLeavesByEmployee?employee_id=' + employee_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public saveLeaves(leavesData: LeavesModel): Observable<ResponseModel<LeavesModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<LeavesModel>>(this.commonService.rootUrl + 'saveLeaves', leavesData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateLeaves(leavesData: LeavesModel): Observable<ResponseModel<LeavesModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<LeavesModel>>(this.commonService.rootUrl + 'updateLeaves', leavesData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteLeaves(leavesId: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteLeaves?leavesId=' + leavesId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public approveLeaves(leavesId: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'approveLeaves?leavesId=' + leavesId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public rejectLeaves(leavesId: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'rejectLeaves?leavesId=' + leavesId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteMultipleLeaves(selectedIds: Array<number>): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteLeaves', { 'id': selectedIds }, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
}