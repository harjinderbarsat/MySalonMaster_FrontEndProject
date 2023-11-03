import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import { CommonService } from 'src/app/services/common.service';
import { BranchModel, BranchPermissionCategoryModel, BranchPermissionModel } from '../models/branch-model.model';
import { permissonResponseModel } from '../models/servic.model';

@Injectable({
  providedIn: 'root'
})
export class BranchsServiceService {

  constructor(public http: HttpClient, public commonService: CommonService) { }

  public getBranchList(admin_id = null): Observable<ResponseModel<Array<BranchModel>>> {
    //var token = this.commonService.getUserToken();
    let currentUser = this.commonService.getUserProfile();
    let url = this.commonService.rootUrl + 'getBranchList';
    if (admin_id) {
      url += "?adminId=" + admin_id;
    }
    else
      url += (currentUser.userType == 'admin' ? ("?adminId=" + currentUser.id) : '');
    // return this.http.get<ResponseModel<Array<BranchModel>>>(url, {
    //   headers: new HttpHeaders().set('Authorization', token)
    // });
    return this.http.get<ResponseModel<Array<BranchModel>>>(url);
  }

  public getBranchById(branch_id: number): Observable<ResponseModel<BranchModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<BranchModel>>(this.commonService.rootUrl + 'getBranchById?branchId=' + branch_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getAppointmentBookedSlot(date: string, slot: string): Observable<ResponseModel<number>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<number>>(this.commonService.rootUrl + 'getAppointmentBookedSlot?date=' + date + '&slot=' + slot, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public saveBranch(branchData: BranchModel): Observable<ResponseModel<BranchModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<BranchModel>>(this.commonService.rootUrl + 'saveBranch', branchData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateBranch(branchData: BranchModel): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'updateBranch', branchData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteBranch(branch_id: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteBranch?branchId=' + branch_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getServiceAccess(branch_id: number): Observable<ResponseModel<Array<permissonResponseModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<permissonResponseModel>>>(this.commonService.rootUrl + 'getServiceAccess?branchId=' + branch_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public saveServiceAccess(saveData: BranchPermissionModel): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'saveServiceAccess', saveData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
}
