import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentsModel } from 'src/app/shared-module/models/appointments.model';
import { CookieService } from 'ngx-cookie-service';
import { ProductCategoryModel, ProductModel } from '../../models/product.model';
import { ProductService } from '../../service/product.service';
import { ProductSaleDetailsModel, ProductSaleModel } from '../../models/product-sale-model';
import { ProductSaleSaleService } from '../../service/product-sale.service';
import { User } from 'src/app/front-end/models/login.model';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../service/employee.service';
import { EmployeeModel } from '../../models/employee-model.model';

@Component({
  selector: 'app-product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.css']
})
export class ProductSelectorComponent implements OnInit {

  constructor(private modalService: NgbModal, private activeRoute: ActivatedRoute, private cService: CommonService, private productSaleService: ProductSaleSaleService, private servicesService: ProductService, private cookieService: CookieService, private employeeService: EmployeeService) { }
  categories: Array<ProductCategoryModel>
  inProgress: boolean
  appointmentModel: AppointmentsModel;
  client_id: number;
  currentUser: User
  soildById: string;
  selectedEmpId: string;

  ngOnInit() {
    this.inProgress = true;
    this.selectedServies = new Array<ProductModel>();
    this.getCategoriesList();
    this.appointmentModel = new AppointmentsModel();
    this.client_id = this.activeRoute.snapshot.params.id;
    this.currentUser = this.cService.getUserProfile();
    this.getEmployeeList();
  }

  getCategoriesList() {
    this.categories = new Array<ProductCategoryModel>();
    this.servicesService.getProductCategoryList().subscribe(async response => {
      if (response.isSuccess && response.data && response.data.length > 0) {
        this.categories = response.data;
        this.categories.forEach(p => p.isSelected = false);
        this.currentSelectedCategory = this.categories[0];
        this.categories[0].isSelected = true;
        this.getServices();
      }
      else
     {
        this.inProgress = false;
        this.cService.getToaster('Prodcut details not available. Please try again later.', 'error', 'Error');
      }
    }, async error => {
      this.cService.getToaster('Application error', 'error', 'Error');
      this.inProgress = false;
    });
  }

  services: Array<ProductModel>
  getServices() {
    this.services = new Array<ProductModel>();
    this.servicesService.getProductList().subscribe(async response => {
      if (response.isSuccess && response.data && response.data.length > 0) {
        this.services = response.data;
        this.selectedCategory(this.categories[0]);
      }
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  currentSelectedCategory: ProductCategoryModel
  selectServicesList: Array<ProductModel>
  selectedCategory(category: ProductCategoryModel) {
    this.currentSelectedCategory = new ProductCategoryModel();
    this.categories.forEach(p => p.isSelected = false);
    this.currentSelectedCategory = category;
    this.currentSelectedCategory.isSelected = true;
    this.selectServicesList = new Array<ProductModel>();
    this.selectServicesList = this.services.filter(p => p.categoryId == this.currentSelectedCategory.id);
  }

  selectedServies: Array<ProductModel>
  subtotal: number;
  tax: number;
  total: number;
  selectService(service: ProductModel) {
    if (service.isSelected) {
      service.productQty = 1;
      service.isSelected = false;
      let idx = this.selectedServies.indexOf(service);
      this.selectedServies.splice(idx, 1);
    } else {
      service.productQty = 1;
      service.isSelected = true;
      this.selectedServies.push(service);
    }
    if (this.selectedServies) {
      this.calculateTotal();
    }
  }

  addServiceQty(service: ProductModel) {
    if (service.productQty < service.qty) {
      service.productQty += 1;
    }
    this.calculateTotal();
  }

  reduceServiceQty(service: ProductModel) {
    if (service.productQty > 1) {
      service.productQty -= 1;
    }
    this.calculateTotal();
  }
  calculateTotal() {
    this.total = 0;
    this.subtotal = 0;
    this.tax = 0;
    this.selectedServies.forEach(p => {
      this.subtotal += (Number(p.price) * Number(p.productQty));
    });
    this.total = this.subtotal + this.tax;
  }

  employeesList: Array<EmployeeModel>;
  getEmployeeList() {
    this.employeesList = new Array<EmployeeModel>();
    this.employeeService.getEmployeeList().subscribe(async response => {
      this.employeesList = response.data;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Somthing went wrong', 'error', 'Error');
    });
  }

  prodSaleModel: ProductSaleDetailsModel
  productSaleModel: ProductSaleModel;


  Proceed(content) {
    this.selectedEmpId = null;
    this.modalService.open(content, { size: "xs", backdrop: "static" });
  }

  
  onSelectedEmployee() {
    if (!this.selectedEmpId) {
      this.cService.getToaster('Please select Employee first', 'info', 'Select Employee');
    } else {
      this.modalService.dismissAll();
      this.saveData();
    }
  }

  saveData() {
 
        this.inProgress = true;
        this.productSaleModel = new ProductSaleModel();
        this.productSaleModel.employeeUniqueId = this.selectedEmpId;
        this.productSaleModel.clientId = this.client_id;
        this.productSaleModel.products = new Array<ProductSaleDetailsModel>();
        this.productSaleModel.saleType = 'dirtectSale';
        let tAmount = 0;

        this.selectedServies.forEach(p => {

          this.prodSaleModel = new ProductSaleDetailsModel();
          this.prodSaleModel.productId = p.id;
          this.prodSaleModel.qty = p.productQty;
          this.prodSaleModel.price = p.price;
          this.prodSaleModel.totalAmount = (p.productQty * p.price);
          tAmount = tAmount + this.prodSaleModel.totalAmount;
          this.productSaleModel.products.push(this.prodSaleModel);
        });

        this.productSaleModel.totalAmount = tAmount;

        this.productSaleService.saveProductSale(this.productSaleModel).subscribe(async response => {
          if (response && response.isSuccess) {
            this.cService.getToaster('Product Saled', 'success', 'Success');
            window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/payment/" + response.data[0].id + "/product";

          }
        }, async error => {
          this.cService.getToaster('Application error', 'error', 'Error');
        });
      

  }

  deleteService(product) {

    let idx = this.selectedServies.indexOf(product);
    this.selectedServies.splice(idx, 1);
    const serv = this.services.find(p => p.id == product.id);
    this.total = this.total - serv.price;
    serv.isSelected = false;
  }

  back() {
    window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/product-sale";
  }
  closeModal() {
    this.modalService.dismissAll();
  }
}