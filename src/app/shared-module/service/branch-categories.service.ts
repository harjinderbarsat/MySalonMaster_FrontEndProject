import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import { CommonService } from 'src/app/services/common.service';
import { ServiceModel, ServiceCategoryModel, defaultServiceCategoryData } from '../models/servic.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceAndCategoryServices {

  constructor(public http: HttpClient, public commonService: CommonService) { }

  //Categories 
  public getCategoryList(): Observable<ResponseModel<Array<ServiceCategoryModel>>> {
    let currentUser = this.commonService.getUserProfile();
    let url = this.commonService.rootUrl + 'getCategoryList';
    if (currentUser) {
      url += (currentUser.userType == 'admin' ? ("?admin_id=" + currentUser.id) : ('?branch_id=' + currentUser.branchId));
    }
    else {
      let branch_id = localStorage.getItem('offlineBranchId');
      url += ('?branch_id=' + branch_id);
    }

    return this.http.get<ResponseModel<Array<ServiceCategoryModel>>>(url);
  }

  public getCategoryById(category_id: number): Observable<ResponseModel<ServiceCategoryModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<ServiceCategoryModel>>(this.commonService.rootUrl + 'getCategoryById?category_id=' + category_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public saveCategory(categoryData: ServiceCategoryModel): Observable<ResponseModel<ServiceCategoryModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<ServiceCategoryModel>>(this.commonService.rootUrl + 'saveCategory', categoryData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateCategory(categoryData: ServiceCategoryModel): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'updateCategory', categoryData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteCategory(category_id: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteCategory?categoryId=' + category_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  //Branch Services
  public getServiceListByCategory(category_id: number): Observable<ResponseModel<Array<ServiceModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<ServiceModel>>>(this.commonService.rootUrl + 'getServiceListByCategoryId?category_id=' + category_id, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getServiceList(): Observable<ResponseModel<Array<ServiceModel>>> {
    let currentUser = this.commonService.getUserProfile();
    let url = this.commonService.rootUrl + 'getServiceList';
    if (currentUser) {
      url += (currentUser.userType == 'admin' ? ("?admin_id=" + currentUser.id) : ('?branch_id=' + currentUser.branchId));
    }
    else {
      let branch_id = localStorage.getItem('offlineBranchId');
      url += ('?branch_id=' + branch_id);
    }
    return this.http.get<ResponseModel<Array<ServiceModel>>>(url);
  }

  public getServiceById(serviceId: number): Observable<ResponseModel<ServiceModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<ServiceModel>>(this.commonService.rootUrl + 'getServiceById?serviceId=' + serviceId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public saveService(categoryServiceData: ServiceModel): Observable<ResponseModel<ServiceModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<ServiceModel>>(this.commonService.rootUrl + 'saveService', categoryServiceData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateService(categoryServiceData: ServiceModel): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'updateService', categoryServiceData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteService(serviceId: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteService?serviceId=' + serviceId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public loadDefaultCategoriesAndServices(): Observable<ResponseModel<boolean>> {
    const categoryServiceData = defaultServiceCategoryData
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'saveCategoryJson', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteMultipleCategories(selectedIds: Array<number>): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteServiceCategories', { 'id': selectedIds }, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteMultipleServices(selectedIds: Array<number>): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteServices', { 'id': selectedIds }, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

}
