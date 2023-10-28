import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { User } from 'src/app/front-end/models/login.model';
import { ProductService } from '../../service/product.service';
import { ProductCategoryModel } from '../../models/product.model';

@Component({
  selector: 'app-new-product-category',
  templateUrl: './new-product-category.component.html',
  styleUrls: ['./new-product-category.component.css']
})
export class NewProductCategoryComponent implements OnInit {

  constructor(private modalService: NgbModal, private cService: CommonService, private productService: ProductService) { }
  inProgress: boolean
  categories: Array<ProductCategoryModel>
  selectedProductCategory: ProductCategoryModel
  currentUser: User
  @Output() getProductCategoryList = new EventEmitter<number>();

  ngOnInit() {
    this.inProgress = false;
    this.categories = new Array<ProductCategoryModel>();
    this.currentUser = this.cService.getUserProfile();
  }

  openProductCategoryModal(content, category: ProductCategoryModel, isEditMode: boolean) {
    this.selectedProductCategory = new ProductCategoryModel();
    this.selectedProductCategory.status='1';
    if (isEditMode) {
      this.selectedProductCategory = category;
    }
    this.modalService.open(content, { size: "lg", backdrop: "static" });
  }

  saveProductCategory() {

    if (!this.selectedProductCategory.name || this.selectedProductCategory.name == '') {
      this.cService.getToaster('Kindly enter product categoty name.', 'info', 'Name Required');
      return
    }
    this.inProgress = true;
    if (this.selectedProductCategory.id) {
      this.productService.updateProductCategory(this.selectedProductCategory).subscribe(async response => {
        this.cService.getToaster('ProductCategory updated succesfully', 'success', 'Success');
        this.inProgress = false;
        this.modalService.dismissAll();
        this.getProductCategoryList.emit();

      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    } else {
      this.productService.saveProductCategory(this.selectedProductCategory).subscribe(async response => {
        this.cService.getToaster('ProductCategory saved succesfully', 'success', 'Success');
        this.inProgress = false;
        this.modalService.dismissAll();
        this.getProductCategoryList.emit();
      }, async error => {
        this.inProgress = false;
        this.modalService.dismissAll();
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    }
  }
  
  closeModal() {
    this.modalService.dismissAll()
  }

}
