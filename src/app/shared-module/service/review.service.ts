import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import { CommonService } from 'src/app/services/common.service';
import { Feedback } from '../models/feedback.model';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(public http: HttpClient, public commonService: CommonService) { }

  public getFeedbackList(): Observable<ResponseModel<Array<Feedback>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<Feedback>>>(this.commonService.rootUrl + 'getFeedbackList', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getFeedbackById(feedbackId: number): Observable<ResponseModel<Feedback>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Feedback>>(this.commonService.rootUrl + 'getFeedbackById?feedbackId=' + feedbackId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public saveFeedback(feedbackData: Feedback): Observable<ResponseModel<Feedback>> {
    return this.http.post<ResponseModel<Feedback>>(this.commonService.rootUrl + 'saveFeedback', feedbackData);
  }

  public updateFeedback(feedbackData: Feedback): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'updateFeedback', feedbackData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteFeedback(feedbackId: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteFeedback?feedbackId=' + feedbackId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteMultipleReviews(selectedIds: Array<number>): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteClientReviews', { 'id': selectedIds }, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
}
