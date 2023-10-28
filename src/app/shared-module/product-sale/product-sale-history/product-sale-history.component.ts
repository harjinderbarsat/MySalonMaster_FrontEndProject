import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { parse } from 'querystring';
import { User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import { ProductSaleDetailsModel, ProductSaleModel } from '../../models/product-sale-model';
import { ProductSaleSaleService } from '../../service/product-sale.service';

@Component({
  selector: 'app-product-sale-history',
  templateUrl: './product-sale-history.component.html',
  styleUrls: ['./product-sale-history.component.css']
})
export class ProductSaleHistoryComponent implements OnInit {

  inProgressProductSale: boolean;
  productSaleList: Array<ProductSaleModel>;
  currentUser: User

  //Paging and serching 
  currentPageNumber: number
  itemsPer: number;
  searchItems: string;
  grandTotal: string;

  constructor(private modalService: NgbModal, private productSaleService: ProductSaleSaleService, public cService: CommonService) { }

  ngOnInit() {
    this.currentUser = this.cService.getUserProfile();
    this.productSaleList = new Array<ProductSaleModel>();
    this.getProductSaleList();

    //Paging and serching
    this.currentPageNumber = 1;
    this.itemsPer = 10;
  }

  //Paging and serching
  onSerch() {
    this.currentPageNumber = 1;
  }

  getProductSaleList() {
    this.inProgressProductSale = true;
    this.productSaleService.getProductSaleList().subscribe(async response => {
      if (response && response.isSuccess && response.data) {
        this.productSaleList = response.data;
      }
      this.inProgressProductSale = false;
    }, async error => {
      this.inProgressProductSale = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  goToSale() {
    window.location.href = window.location.origin + "/#/" + this.currentUser.user_type + "/product-sale";
  }

  productDetails: Array<ProductSaleDetailsModel>
  viewClient(content, client: Array<ProductSaleDetailsModel>) {
    this.productDetails = new Array<ProductSaleDetailsModel>();
    this.productDetails = client;
    this.grandTotal = "";
    let grandTotal = 0;
    this.productDetails.forEach(element => {
      grandTotal += (parseFloat(element.total_amount.toString()));
    });
    this.grandTotal = grandTotal.toFixed(2);
    this.modalService.open(content, { size: "lg", backdrop: "static" });
  }

  closeModal() {
    this.modalService.dismissAll();
  }


}
