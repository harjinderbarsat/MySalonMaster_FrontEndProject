import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import { CommonService } from 'src/app/services/common.service';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  constructor(public http: HttpClient, public commonService: CommonService) { }

  public getALLPaymentList(dateFilter: string): Observable<ResponseModel<Array<Payment>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<Payment>>>(this.commonService.rootUrl + 'getALLPayments?date=' + dateFilter, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getPaymentByFilters(payment: Payment): Observable<ResponseModel<Payment>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<Payment>>(this.commonService.rootUrl + 'getPaymentByFilter', payment, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public addPayment(paymentData: Payment): Observable<ResponseModel<Payment>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<Payment>>(this.commonService.rootUrl + 'savePayment', paymentData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updatePayment(paymentData: Payment): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'updatePayment', paymentData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deletePayment(paymentId: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deletePayment?paymentId=' + paymentId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
}
