import { Component, OnInit } from '@angular/core';
import { ServiceCategoryModel, ServiceModel } from 'src/app/shared-module/models/servic.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-walk-in-panel',
  templateUrl: './walk-in-panel.component.html',
  styleUrls: ['./walk-in-panel.component.css']
})
export class WalkInPanelComponent implements OnInit {

  constructor(private cService: CommonService) { }
  categories: Array<ServiceCategoryModel>
  selectedServies: Array<ServiceModel>
  inProgress: boolean

  subtotal: number = 0;
  tax: number = 2;
  total: number = 0;



  ngOnInit() {
    this.inProgress = false;
    this.categories = new Array<ServiceCategoryModel>();
    this.selectedServies = new Array<ServiceModel>();
  }
  selectService(service: ServiceModel, category: ServiceCategoryModel) {
    if (service.isSelected) {
      service.isSelected = false;
      let idx = this.selectedServies.indexOf(service);
      this.selectedServies.splice(idx, 1);

      if (this.selectedServies.length == 0) {
        this.total = 0;
        this.subtotal = 0;
        this.tax = 0;
      } else {
        this.total = this.total - service.price;
        this.subtotal = this.subtotal - service.price;
      }
    } else {

      service.category_name = category ? category.name : '';
      service.isSelected = true;
      this.selectedServies.push(service);

      this.total = this.total == 0 ? this.tax : this.total;
      this.total = this.total + service.price;
      this.subtotal = this.subtotal + service.price;

    }
  }

  Proceed() {
    window.location.href = window.location.origin + "/#/walkInPayment/0";
  }

}
