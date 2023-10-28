import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response-model.model';
import { RuleModel } from '../models/rule-model.model';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor(public http: HttpClient, public commonService: CommonService) { }

  public getRules(): Observable<ResponseModel<Array<RuleModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<RuleModel>>>(this.commonService.rootUrl + 'getRules', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getRule(ruleId:number): Observable<ResponseModel<RuleModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<RuleModel>>(this.commonService.rootUrl + 'getRule?id=' + ruleId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public createRule(model: RuleModel): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'createRule', model, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateRule(model: RuleModel): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'updateRule', model, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteRule(ruleId: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteRule?id=' + ruleId, {
      headers: new HttpHeaders().set('Authorization', token) 
    });
  }
}
