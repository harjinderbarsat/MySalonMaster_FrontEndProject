import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response-model.model';
import { CommonService } from 'src/app/services/common.service';
import { ProductCategoryModel, ProductModel } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(public http: HttpClient, public commonService: CommonService) { }

  public getProductCategoryList(): Observable<ResponseModel<Array<ProductCategoryModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<ProductCategoryModel>>>(this.commonService.rootUrl + 'getProductCategoryList', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getParentProductCategoryList(): Observable<any> {
    return this.http.get("../../../../assets/ProductParentCategories/ParentCategories.json");
  }


  public getProductCategoryById(productCategoryId: number): Observable<ResponseModel<ProductCategoryModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<ProductCategoryModel>>(this.commonService.rootUrl + 'getProductCategoryById?productCategoryId=' + productCategoryId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public saveProductCategory(productCategoryData: ProductCategoryModel): Observable<ResponseModel<ProductCategoryModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<ProductCategoryModel>>(this.commonService.rootUrl + 'saveProductCategory', productCategoryData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateProductCategory(productCategoryData: ProductCategoryModel): Observable<ResponseModel<ProductCategoryModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<ProductCategoryModel>>(this.commonService.rootUrl + 'updateProductCategory', productCategoryData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteProductCategory(productCategoryId: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteProductCategory?productCategoryId=' + productCategoryId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getProductList(): Observable<ResponseModel<Array<ProductModel>>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<Array<ProductModel>>>(this.commonService.rootUrl + 'getProductList', {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public getProductById(productId: number): Observable<ResponseModel<ProductModel>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<ProductModel>>(this.commonService.rootUrl + 'getProductById?productId=' + productId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public saveProduct(productData: ProductModel): Observable<ResponseModel<ProductModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<ProductModel>>(this.commonService.rootUrl + 'saveProduct', productData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public updateProduct(productData: ProductModel): Observable<ResponseModel<ProductModel>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<ProductModel>>(this.commonService.rootUrl + 'updateProduct', productData, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteProduct(productId: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteProduct?productId=' + productId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  // ------------------------------------ Profile Picture ---------------------------------------------

  public uploadProductImage(file: File, productId: number): Observable<ResponseModel<boolean>> {
    const uploadDetials = new FormData();
    uploadDetials.append('image', file);
    uploadDetials.append('productId', productId.toString());
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'uploadProductImage', uploadDetials, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public deleteProductImage(productId: number): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.get<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteProductImage?productId=' + productId, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }


  public deleteMultipleProducts(selectedIds: Array<number>): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteProducts', { 'id': selectedIds }, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }


  public deleteMultipleProductCategories(selectedIds: Array<number>): Observable<ResponseModel<boolean>> {
    var token = this.commonService.getUserToken();
    return this.http.post<ResponseModel<boolean>>(this.commonService.rootUrl + 'deleteProductCategories', { 'id': selectedIds }, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }


}