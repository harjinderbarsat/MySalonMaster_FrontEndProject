import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import { CommonService } from 'src/app/services/common.service';
import { DashboardModel } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public http: HttpClient, public commonService: CommonService) { }
  public getDashboardData(): Observable<ResponseModel<DashboardModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<DashboardModel>>(this.commonService.rootUrl + 'displayCounters', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
}
