import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import {  LoginModel, LoginResponse, ResetPassword, User } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient, public commonService: CommonService) { }
  public login(loginData: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.commonService.rootUrl + 'login', loginData, {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')});
  }

  public logout(): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'logout', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  } 

  public ResetPassword(ResetPasswordData: ResetPassword): Observable<ResponseModel<boolean>> {
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'password/reset', ResetPasswordData);
  }

  public forgotPassword(email: string): Observable<ResponseModel<boolean>> {
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'password/email', { 'email': email });
  }

  public emailVerification(userId: number): Observable<ResponseModel<boolean>> {
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'email/verify/' + userId);
  }

  public getUserDetails(): Observable<ResponseModel<User>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<User>>(this.commonService.rootUrl + 'userDetails', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }   

}