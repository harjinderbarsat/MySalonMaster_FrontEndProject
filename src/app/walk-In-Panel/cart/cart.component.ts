import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AppointmentsModel } from 'src/app/shared-module/models/appointments.model';
import { ServiceModel } from 'src/app/shared-module/models/servic.model';
import { ServiceAndCategoryServices } from 'src/app/shared-module/service/branch-categories.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private servicesService: ServiceAndCategoryServices, public cService: CommonService) { }

  @Input() selectedServies: Array<ServiceModel>
  @Input() isEditMode: boolean

  @Input() subtotal: number;
  @Input() tax: number;
  @Input() total: number;

  @Input() isStaticData: boolean
  inProgress: boolean
  appointmentModel: AppointmentsModel;
  @Output() deleteServiceData = new EventEmitter<number>();
  ngOnInit() {
    if (this.isStaticData) {
      this.selectedServies = new Array<ServiceModel>();
      this.appointmentModel = new AppointmentsModel();
      this.appointmentModel.servicesIds = new Array<number>();

      this.appointmentModel.servicesIds = JSON.parse(localStorage.getItem('currentSelectedAppointmentServices'));
      this.getServices(this.appointmentModel.servicesIds)
    }
  }

  services: Array<ServiceModel>
  getServices(serviceIds: Array<number>) {
    this.services = new Array<ServiceModel>();
    this.servicesService.getServiceList().subscribe(async response => {
      if (response.isSuccess && response.data && response.data.length > 0) {
        this.services = response.data;
        this.services.forEach(p => {
          serviceIds.forEach(v => {
            if (p.id == v) {
              this.selectedServies.push(p);
              this.total = this.total + Number(p.price);
            }
          })
        })
      }
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  deleteService(service: ServiceModel) {
    this.deleteServiceData.emit(service.id);
    const indx = this.selectedServies.indexOf(service);
    this.selectedServies.splice(indx, 1);
  }

}
