import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/front-end/models/login.model';
import { ProductService } from '../../service/product.service';
import { ProductCategoryModel, ProductParentCategoryModel } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  constructor(private modalService: NgbModal, private cService: CommonService, private productService: ProductService) { }
  inProgress: boolean
  categories: Array<ProductCategoryModel>
  selectedProductCategory: ProductCategoryModel
  currentUser: User
  productParentCategoryModel: Array<ProductParentCategoryModel> = new Array<ProductParentCategoryModel>();
  isBranchPannel: boolean;

  ngOnInit() {
    this.inProgress = false;
    this.categories = new Array<ProductCategoryModel>();
    this.getProductCategoryList();
    this.getParentProductCategoryList();
    this.currentUser = this.cService.getUserProfile();
    this.isBranchPannel = this.currentUser.userType == 'branch';
  }

  openProductCategoryModal(content, category: ProductCategoryModel, isEditMode: boolean) {
    this.selectedProductCategory = new ProductCategoryModel();
    this.selectedProductCategory.status = '1';
    if (isEditMode) {
      this.selectedProductCategory = category;
    }
    this.modalService.open(content, { size: "lg", backdrop: "static" });
  }

  public getParentProductCategoryList() {
    this.productService.getParentProductCategoryList().subscribe(res => {
      this.productParentCategoryModel = res && res.length > 0 ? res.filter(p => p.visibility) : new Array<ProductParentCategoryModel>();
    })
  }

  getParentCategoryName(id): string {
    const parentCategoryModal = this.productParentCategoryModel.find(p => p.id == id);
    return parentCategoryModal ? parentCategoryModal.name : '';
  }

  saveProductCategory() {
    if (!this.selectedProductCategory.name || this.selectedProductCategory.name == '') {
      this.cService.getToaster('Kindly enter product categoty name.', 'info', 'Name Required');
      return
    }

    if (!this.selectedProductCategory.mainCategory || this.selectedProductCategory.mainCategory == '') {
      this.cService.getToaster('Kindly select product Parent category name.', 'info', 'Parent Category Required');
      return
    }


    this.inProgress = true;
    if (this.selectedProductCategory.id) {
      this.productService.updateProductCategory(this.selectedProductCategory).subscribe(async response => {
        this.cService.getToaster('ProductCategory updated succesfully', 'success', 'Success');
        this.inProgress = false;
        this.getProductCategoryList();

      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    } else {
      this.productService.saveProductCategory(this.selectedProductCategory).subscribe(async response => {
        this.cService.getToaster('ProductCategory saved succesfully', 'success', 'Success');
        this.inProgress = false;
        this.getProductCategoryList();

      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    }
    this.modalService.dismissAll();
  }

  getProductCategoryList() {
    this.inProgress = true;
    this.productService.getProductCategoryList().subscribe(async response => {
      this.categories = response.data;
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  deleteProductCategory(category: ProductCategoryModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.productService.deleteProductCategory(category.id).subscribe(async response => {
            this.inProgress = false;
            this.getProductCategoryList();
            if (response.isSuccess) {
              this.cService.getToaster('ProductCategory deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

  updatedProductCategoryStatus(category: ProductCategoryModel, status: string) {
    category.status = status;
    this.productService.updateProductCategory(category).subscribe(async response => {
      this.cService.getToaster('ProductCategory status updated succesfully', 'success', 'Success');
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  // Delete Multiple Funcationality 
  selectedAll: boolean = false;
  hideDeleteSelectedBtn: boolean = false;
  selectedIds: Array<number>;

  selectAll(event) {
    if (event.target.checked) {
      this.selectedAll = true;
      if (this.categories && this.categories.length > 0) {
        this.categories.forEach(p => p.isSelected = true);
      }
      this.hideDeleteSelectedBtn = true;
    } else {
      this.selectedAll = false;
      if (this.categories && this.categories.length > 0) {
        this.categories.forEach(p => p.isSelected = false);
      }
      this.hideDeleteSelectedBtn = false;
    }
  }

  change(appointment: ProductCategoryModel, event) {
    if (event.target.checked) {
      appointment.isSelected = true;
    } else {
      appointment.isSelected = false;
    }

    if (this.categories.some(p => p.isSelected)) {
      this.hideDeleteSelectedBtn = true;
    } else {
      this.hideDeleteSelectedBtn = false;
    }
  }

  deleteSelected() {
    this.selectedIds = new Array<number>();
    this.categories.forEach(p => {
      if (p.isSelected) {
        this.selectedIds.push(p.id);
      }
    });

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this product categories!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'NO'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.productService.deleteMultipleProducts(this.selectedIds).subscribe(async response => {
            this.inProgress = false;
            this.getProductCategoryList();
            if (response.isSuccess) {
              this.cService.getToaster('categories deleted product categories', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

  currentSelected: ProductCategoryModel;
  viewClient(content, client: ProductCategoryModel) {
    this.currentSelected = new ProductCategoryModel();
    this.currentSelected = client;
    this.modalService.open(content, { size: "md", backdrop: "static" });
  }


  downloadXslx(): void {
    let element = document.getElementById('table-xsls');
    this.cService.download_XLSX(element, "Product's List");
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
