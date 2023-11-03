import { Component, OnInit } from '@angular/core';
import { ServiceCategoryModel, ServiceModel } from 'src/app/shared-module/models/servic.model';
import { CommonService } from 'src/app/services/common.service';
import { ServiceAndCategoryServices } from 'src/app/shared-module/service/branch-categories.service';
import { AppointmentsModel } from 'src/app/shared-module/models/appointments.model';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-walk-in-client-registraion',
  templateUrl: './walk-in-select-service.html',
  styleUrls: ['./walk-in-select-service.component.css']
})
export class WalkInSelectServiceComponent implements OnInit {

  constructor(private cService: CommonService, private servicesService: ServiceAndCategoryServices, private cookieService: CookieService) { }
  categories: Array<ServiceCategoryModel>
  inProgress: boolean
  appointmentModel: AppointmentsModel;


  ngOnInit() {
    this.inProgress = true;
    this.selectedServies = new Array<ServiceModel>();
    this.getCategoriesList();
    this.appointmentModel = new AppointmentsModel();
    const aponment = this.cService.getCurrentSelectAppointment();
    this.appointmentModel.customerId = aponment.customerId;
  }

  getCategoriesList() {
    this.categories = new Array<ServiceCategoryModel>();
    this.servicesService.getCategoryList().subscribe(async response => {
      if (response.isSuccess && response.data && response.data.length > 0) {
        this.categories = response.data;
        this.categories.forEach(p => p.isSelected = false);
        this.currentSelectedCategory = this.categories[0];
        this.categories[0].isSelected = true;
        this.getServices();
      }
    }, async error => {
      this.cService.getToaster('Application error', 'error', 'Error');
      this.inProgress = false;
    });
  }

  services: Array<ServiceModel>
  getServices() {
    this.services = new Array<ServiceModel>();
    this.servicesService.getServiceList().subscribe(async response => {
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

  currentSelectedCategory: ServiceCategoryModel
  selectServicesList: Array<ServiceModel>
  selectedCategory(category: ServiceCategoryModel) {
    this.currentSelectedCategory = new ServiceCategoryModel();
    this.categories.forEach(p => p.isSelected = false);
    this.currentSelectedCategory = category;
    this.currentSelectedCategory.isSelected = true;
    this.selectServicesList = new Array<ServiceModel>();
    this.selectServicesList = this.services.filter(p => p.categoryId == this.currentSelectedCategory.id);
  }

  selectedServies: Array<ServiceModel>
  subtotal: number;
  tax: number;
  total: number;
  selectService(service: ServiceModel) {
    if (service.isSelected) {
      service.isSelected = false;
      let idx = this.selectedServies.indexOf(service);
      this.selectedServies.splice(idx, 1);
    } else {
      service.isSelected = true;
      this.selectedServies.push(service);
    }
    if (this.selectedServies) {
      this.total = 0;
      this.subtotal = 0;
      this.tax = 0;
      this.selectedServies.forEach(p => {
        this.subtotal += Number(p.price);
      });
      this.total = this.subtotal + this.tax;
    }

  }

  Proceed() {
    this.appointmentModel.servicesIds = new Array<number>();

    this.selectedServies.forEach(p => {
      this.appointmentModel.servicesIds.push(p.id);
    })
    this.cService.setCurrentSelectAppointment(this.appointmentModel);
    localStorage.removeItem('currentSelectedAppointmentServices');
    localStorage.setItem('currentSelectedAppointmentServices', JSON.stringify(this.appointmentModel.servicesIds));
    localStorage.setItem('currentSelectedAppointmentAmount', JSON.stringify(this.total));
    window.location.href = window.location.origin + "/#/walkIn/appointment-time";
  }

  deleteService(id) {
    const serv = this.services.find(p => p.id == id);
    this.total = this.total - serv.price;
    serv.isSelected = false;
  }

  back() {
    const currentSelectedStatus = localStorage.getItem('currentSelectedStatus');
    const type = (currentSelectedStatus == 'online') ? 'online' : 'offline';
    window.location.href = window.location.origin + "/#/walkIn/clientRegistration/" + type;

  }

}
