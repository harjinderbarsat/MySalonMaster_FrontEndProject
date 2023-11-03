import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import { CommonService } from 'src/app/services/common.service';
import { ClientModel } from '../models/client.model';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public http: HttpClient, public commonService: CommonService) { }

  public getClientList(): Observable<ResponseModel<Array<ClientModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<ClientModel>>>(this.commonService.rootUrl + 'getClientList', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getClientById(client_id: number): Observable<ResponseModel<ClientModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<ClientModel>>(this.commonService.rootUrl + 'getClientById?clientId=' + client_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  public getClientByMobile(mobileNumber: string): Observable<ResponseModel<ClientModel>> {
    let url = this.commonService.rootUrl + 'getClientByMobile?mobile=' + mobileNumber;

    let currentUser = this.commonService.getUserProfile();
    if (currentUser) {
      url += (currentUser.userType == 'admin' ? ("&admin_id=" + currentUser.id) : ('&branch_id=' + currentUser.branchId));
    }
    else {
      let branch_id = localStorage.getItem('offlineBranchId');
      url += ('&branch_id=' + branch_id);
    }

    return this.http.get<ResponseModel<ClientModel>>(url);
  }

  public saveClient(clientData: ClientModel): Observable<ResponseModel<ClientModel>> {
    let currentUser = this.commonService.getUserProfile();
    if (currentUser) {
      if (currentUser.userType == 'admin') {
        clientData.admin_id = currentUser.id;
      }
      else {
        clientData.branch_id = currentUser.branchId;
      }
    }
    else {
      let branch_id = localStorage.getItem('offlineBranchId');
      if (branch_id && branch_id.length > 0) {
        clientData.branch_id = parseInt(branch_id);
      }
    }

    return this.http.post<ResponseModel<ClientModel>>(this.commonService.rootUrl + 'saveClient', clientData);
  }

  public updateClient(clientData: ClientModel): Observable<ResponseModel<ClientModel>> {
    let currentUser = this.commonService.getUserProfile();
    if (currentUser) {
      if (currentUser.userType == 'admin') {
        clientData.admin_id = currentUser.id;
      }
      else {
        clientData.branch_id = currentUser.branchId;
      }
    }
    else {
      let branch_id = localStorage.getItem('offlineBranchId');
      if (branch_id && branch_id.length > 0) {
        clientData.branch_id = parseInt(branch_id);
      }
    }

    return this.http.post<ResponseModel<ClientModel>>(this.commonService.rootUrl + 'updateClient', clientData);
  }

  public deleteClient(client_id: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteClient?client_id=' + client_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteMultipleClients(selectedIds: Array<number>): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteClients', { 'id': selectedIds }, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
}
