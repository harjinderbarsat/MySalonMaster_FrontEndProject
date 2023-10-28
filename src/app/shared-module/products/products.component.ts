import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { ProductCategoryModel, ProductModel, ProductParentCategoryModel } from '../models/product.model';
import { ProductService } from '../service/product.service';
import { User } from 'src/app/front-end/models/login.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<ProductModel>
  allproducts: Array<ProductModel>
  constructor(private cService: CommonService, private productService: ProductService, private modalService: NgbModal) { }
  inProgress: boolean
  currentUser: User
  isBranchPannel: boolean;

  ngOnInit() {
    this.inProgress = false;
    this.products = new Array<ProductModel>();
    this.allproducts = new Array<ProductModel>();
    this.getProductsList();
    this.getParentProductCategoryList();
    this.getProductCategoryList();
    this.currentUser = this.cService.getUserProfile();
    this.isBranchPannel = this.currentUser.user_type == 'branch';
  }

  getProductsList() {
    this.inProgress = true;
    this.productService.getProductList().subscribe(async response => {
      this.products = response.data;
      this.allproducts = response.data;
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  deleteProduct(product: ProductModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.productService.deleteProduct(product.id).subscribe(async response => {
            this.inProgress = false;
            this.getProductsList();
            if (response.isSuccess) {
              this.cService.getToaster('Product deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

  addProduct(id: number) {
    window.location.href = window.location.origin + "/#/" + this.currentUser.user_type + "/manage-products/" + id;
  }

  categories: Array<ProductCategoryModel> = new Array<ProductCategoryModel>();
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

  // Delete Multiple Funcationality 
  selectedAll: boolean = false;
  hideDeleteSelectedBtn: boolean = false;
  selectedIds: Array<number>;

  selectAll(event) {
    if (event.target.checked) {
      this.selectedAll = true;
      if (this.products && this.products.length > 0) {
        this.products.forEach(p => p.isSelected = true);
      }
      this.hideDeleteSelectedBtn = true;
    } else {
      this.selectedAll = false;
      if (this.products && this.products.length > 0) {
        this.products.forEach(p => p.isSelected = false);
      }
      this.hideDeleteSelectedBtn = false;
    }
  }

  change(appointment: ProductModel, event) {
    if (event.target.checked) {
      appointment.isSelected = true;
    } else {
      appointment.isSelected = false;
    }

    if (this.products.some(p => p.isSelected)) {
      this.hideDeleteSelectedBtn = true;
    } else {
      this.hideDeleteSelectedBtn = false;
    }
  }

  deleteSelected() {
    this.selectedIds = new Array<number>();
    this.products.forEach(p => {
      if (p.isSelected) {
        this.selectedIds.push(p.id);
      }
    });

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this products!',
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
            this.getProductsList();
            if (response.isSuccess) {
              this.cService.getToaster('products deleted products', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

  currentSelected: ProductModel;
  viewClient(content, client: ProductModel) {
    this.currentSelected = new ProductModel();
    this.currentSelected = client;
    this.modalService.open(content, { size: "md", backdrop: "static" });
  }

  categorySortAsc: boolean = true;
  qtySortAsc: boolean = true;
  nameSortAsc: boolean = true;
  priceSortAsc: boolean = true;

  sortByColumn(list: any[] | undefined, column: string): any[] {

    let dir: Boolean = false;
    if (column == 'category_name') {
      this.categorySortAsc = !this.categorySortAsc;
      dir = !this.categorySortAsc;
    } else if (column == 'qty') {
      this.qtySortAsc = !this.qtySortAsc;
      dir = !this.qtySortAsc;
    } else if (column == 'name') {
      this.nameSortAsc = !this.nameSortAsc;
      dir = !this.nameSortAsc;
    } else if (column == 'price') {
      this.priceSortAsc = !this.priceSortAsc;
      dir = !this.priceSortAsc;
    }

    if (column == 'qty' || column == 'price') {
      let sortedArray1 = (list || []).sort((a, b) => {
        if (Number(a[column]) > Number(b[column])) {
          return (dir) ? 1 : -1;
        }
        if (Number(a[column]) < Number(b[column])) {
          return (dir) ? -1 : 1;
        }
        return 0;
      })
      return sortedArray1;
    } else {

      let sortedArray = (list || []).sort((a, b) => {
        if (a[column].toUpperCase() > b[column].toUpperCase()) {
          return (dir) ? 1 : -1;
        }
        if (a[column].toUpperCase() < b[column].toUpperCase()) {
          return (dir) ? -1 : 1;
        }
        return 0;
      })
      return sortedArray;
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  // --------------------------------Filtering and printing  ------------------------------------

  showFilter: boolean = false;
  filterType: string = "";
  filterValue: any = null;

  hideShowFilter() {
    this.showFilter = !this.showFilter;
    this.filterValue = null;
    this.filterType = '';
  }

  getFilteredDataList() {
    this.products = new Array<ProductModel>();
    if (this.filterType != '') {
      if (this.filterType == 'price') {
        this.products = this.allproducts.filter(p => p.price == this.filterValue);
      } else if (this.filterType == 'category') {
        this.products = this.allproducts.filter(p => p.category_id == this.filterValue.toLowerCase());
      } else if (this.filterType == 'maincategory') {
        this.products = this.allproducts.filter(p => p.mainCategoryId == this.filterValue.toLowerCase());
      } else if (this.filterType == 'name') {
        this.products = this.allproducts.filter(p => p.name.toLowerCase().includes(this.filterValue.toLowerCase()));
      }
    }
  }

  productParentCategoryModel: Array<ProductParentCategoryModel> = new Array<ProductParentCategoryModel>();
  public getParentProductCategoryList() {
    this.productService.getParentProductCategoryList().subscribe(res => {
      this.productParentCategoryModel = res && res.length > 0 ? res.filter(p => p.visibility) : new Array<ProductParentCategoryModel>();
    })
  }

  resetFilter() {
    this.products = this.allproducts;
    this.filterValue = "";
    this.filterType = '';
    this.showFilter = false;
  }

  onFilterTypeChange(){
    this.filterValue = "";
  }

  // --------------------------------Reporting and Printing ------------------------------------
  isPrintView: boolean = false;
  hideShowPrintView() {
    this.isPrintView = !this.isPrintView;
  }

  downloadXslx(): void {
    let element = document.getElementById('table-xsls');
    this.cService.download_XLSX(element, 'Clients List')
    this.isPrintView = false;
  }

}
