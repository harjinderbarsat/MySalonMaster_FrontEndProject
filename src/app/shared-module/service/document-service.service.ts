import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
import { ResponseModel } from 'src/app/models/response-model.model';
import { Observable } from 'rxjs';
import { DocumentsModel, DocumentType } from '../models/documents-model.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(public http: HttpClient, public commonService: CommonService) { }

  public saveDocument(file: File, type: string): Observable<ResponseModel<boolean>> {
    const uploadDetials = new FormData();
    uploadDetials.append('file', file);
    uploadDetials.append('type', DocumentType[type]);

    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(`${this.commonService.rootUrl}saveDocument`, uploadDetials, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateDocument(file: File, id: number): Observable<ResponseModel<boolean>> {

    const uploadDetials = new FormData();
    uploadDetials.append('file', file);
    uploadDetials.append('id', id.toString());
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(`${this.commonService.rootUrl}updateDocument`, uploadDetials, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteDocument(id: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(`${this.commonService.rootUrl}deleteDocument?id=${id}`, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getDocument(id: number): Observable<ResponseModel<Array<DocumentsModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<DocumentsModel>>>(`${this.commonService.rootUrl}getDocument?id=${id}`, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  public getEmployeeDocument(id: number): Observable<ResponseModel<Array<DocumentsModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<DocumentsModel>>>(`${this.commonService.rootUrl}getEmployeeAllDocument?employee_id=${id}`, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  

  public downloadDocs(fileName: string): Observable<Blob> {
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Authorization': this.commonService.getUserToken(),
      })
    };
    return this.http.get<Blob>(`${this.commonService.rootUrl}downloadDocument?fileName=${fileName}`, httpOptions);
  }



}
