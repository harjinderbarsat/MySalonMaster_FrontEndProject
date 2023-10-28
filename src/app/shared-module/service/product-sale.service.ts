
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import { CommonService } from 'src/app/services/common.service';
import { ProductSaleModel } from '../models/product-sale-model';

@Injectable({
  providedIn: 'root'
})

export class ProductSaleSaleService {

  constructor(public http: HttpClient, public commonService: CommonService) { }

  public getProductSaleList(): Observable<ResponseModel<Array<ProductSaleModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<ProductSaleModel>>>(this.commonService.rootUrl + 'getProductSaleList', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getProductSaleById(productSaleId: number): Observable<ResponseModel<ProductSaleModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<ProductSaleModel>>(this.commonService.rootUrl + 'getProductSaleById?productSaleId=' + productSaleId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public saveProductSale(productSaleData: ProductSaleModel): Observable<ResponseModel<ProductSaleModel>> {
    var token = this.commonService.getUserToken();
    var aa = { 'data': productSaleData }
    return this.http.post<ResponseModel<ProductSaleModel>>(this.commonService.rootUrl + 'saveProductSale', aa, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateProductSale(productSaleData: ProductSaleModel): Observable<ResponseModel<ProductSaleModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<ProductSaleModel>>(this.commonService.rootUrl + 'updateProductSale', productSaleData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteProductSale(productSaleId: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteProductSale?productSaleId=' + productSaleId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
}