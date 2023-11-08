import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { ProductCategoryModel, ProductModel } from '../../models/product.model';
import { ProductService } from '../../service/product.service';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/front-end/models/login.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  isEditMode: boolean;
  inProgress: boolean;
  id: number;
  public productForm: FormGroup;
  productInfo: ProductModel;
  //ngbDateOfBirth: NgbDateStruct;
  currentUser: User

  constructor(private activeRoute: ActivatedRoute, private datePipe: DatePipe, private cService: CommonService, private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    this.inProgress = false;
    this.productInfo = new ProductModel();
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', ''],
      category_id: ['', [Validators.required]],
      qty: ['', ''],
      price: ['', [Validators.required]]
    });
    this.id = this.activeRoute.snapshot.params.id;
    if (this.id == 0) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getProduct(this.id)
    }
    this.currentUser = this.cService.getUserProfile();
    this.getCategoriesList();
  }

  getProduct(productId: number) {

    this.productService.getProductById(productId).subscribe(async response => {
      this.productInfo = response.data;
      // var addedDate = new Date(this.productInfo.date_of_birth);
      //this.ngbDateOfBirth = new NgbDate(addedDate.getFullYear(), (addedDate.getMonth() + 1), addedDate.getDate());
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  saveProduct() {

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.inProgress = true;
    // if (this.ngbDateOfBirth != null && this.ngbDateOfBirth != undefined) {
    //   this.productInfo.date_of_birth = this.datePipe.transform(new Date(this.ngbDateOfBirth.year, (this.ngbDateOfBirth.month - 1), this.ngbDateOfBirth.day), 'yyyy-MM-dd');
    // }
    if (this.isEditMode) {
      this.productService.updateProduct(this.productInfo).subscribe(async response => {
        this.cService.getToaster('Product updated succesfully', 'success', 'Success');
        window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/products";
        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    } else {
      this.productService.saveProduct(this.productInfo).subscribe(async response => {
        this.cService.getToaster('Product saved succesfully', 'success', 'Success');
        window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/products";


        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    }
  }

  categoryList: Array<ProductCategoryModel>;
  getCategoriesList() {
    this.categoryList = new Array<ProductCategoryModel>();
    this.productService.getProductCategoryList().subscribe(async response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
      }
    }, async error => {
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  uploadProductImage(event: any) {
    if (event.target.files.length == 0) {
      return;
    }
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.inProgress = true;
      this.productService.uploadProductImage(event.target.files[0], this.id).subscribe(async response => {
        this.inProgress = false;
        if (response != null && response.isSuccess === true) {
          this.cService.getToaster('Product Image Updated', 'Success', "Success");
          this.getProduct(this.id);
        } else {
          this.cService.getToaster('Error in product Image upload', 'Error', "Error");
        }
      }, async error => {
        this.inProgress = true;
        this.cService.getToaster('Error in product Image upload', 'Error', "Error");
      });
    }
  }

  deleteProductImage() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure, you want to delete product Image!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.productService.deleteProductImage(this.id).subscribe(async response => {
            this.inProgress = false;
            if (response != null && response.isSuccess === true) {
              this.cService.getToaster('Product Image Deleted', 'Success', "Success");
              this.productInfo.imageUrl = null;
            } else {
              this.cService.getToaster('Error in Product Image delete', 'Error', "Error");
            }
          }, async error => {
            this.inProgress = true;
            this.cService.getToaster('Error in Product Image delete', 'Error', "Error");
          });
        }
      });
  }

}
