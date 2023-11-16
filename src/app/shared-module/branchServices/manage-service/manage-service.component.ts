import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ServiceCategoryModel, ServiceModel } from '../../models/servic.model';
import { ServiceAndCategoryServices } from '../../service/branch-categories.service';
import { User } from 'src/app/front-end/models/login.model';

@Component({
  selector: 'app-manage-service',
  templateUrl: './manage-service.component.html',
  styleUrls: ['./manage-service.component.css']
})
export class ManageServiceComponent implements OnInit {

  isEditMode: boolean;
  inProgress: boolean;
  id: number;
  public serviceForm: FormGroup;
  selectedService: ServiceModel
  currentUser: User

  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder, private cService: CommonService, private servicesService: ServiceAndCategoryServices) { }

  ngOnInit() {
    this.inProgress = false;
    this.currentUser = this.cService.getUserProfile();

    this.serviceForm = this.fb.group({
      name: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      description: ['', ''],
      price: ['', [Validators.required]],
      status: ['', ''],
      duration: ['', ''],
      is_this_initial_price: ['', ''],
    });
    this.id = this.activeRoute.snapshot.params.id;
    this.selectedService = new ServiceModel();

    if (this.id == 0) {
      this.isEditMode = false;
      this.selectedService.isThisInitialPrice = '0';
      this.selectedService.status = '1';

    } else {
      this.isEditMode = true;
      this.getService(this.id)
    }


    this.getCategoriesList();
  }

  getService(serviceId: number) {
    this.inProgress = true;

    this.servicesService.getServiceById(serviceId).subscribe(async response => {
      this.selectedService = response.data;
      this.inProgress = false;
      // var addedDate = new Date(this.TicketModel.ticketDate);
      // this.ngbTicketDate = new NgbDate(addedDate.getFullYear(), (addedDate.getMonth() + 1), addedDate.getDate());

      // var removedDate = new Date(this.TicketModel.courtDate);
      // this.ngbCourtDate = new NgbDate(removedDate.getFullYear(), (removedDate.getMonth() + 1), removedDate.getDate());

      // if (this.TicketModel.companyId != undefined && this.TicketModel.companyId != null && this.TicketModel.companyId > 0) {
      //   this.getDriversList(this.TicketModel.companyId)
      // }

    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  categoryList: Array<ServiceCategoryModel>;
  getCategoriesList() {
    this.categoryList = new Array<ServiceCategoryModel>();
    this.servicesService.getCategoryList().subscribe(async response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
      }
    }, async error => {
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  saveService() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    this.inProgress = true;
    if (this.id != 0) {
      this.selectedService.description = this.selectedService.description ? this.selectedService.description : "";
      this.servicesService.updateService(this.selectedService).subscribe(async response => {
        this.cService.getToaster('Service updated succesfully', 'success', 'Success');
        window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/serviceList";
        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    } else {
      this.servicesService.saveService(this.selectedService).subscribe(async response => {
        this.cService.getToaster('Service saved succesfully', 'success', 'Success');
        window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/serviceList";

        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    }
  }

  back(){
    window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/serviceList";
  }

}
