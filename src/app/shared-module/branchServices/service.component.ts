import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ServiceCategoryModel, ServiceModel } from 'src/app/shared-module/models/servic.model';
import Swal from 'sweetalert2';
import { ServiceAndCategoryServices } from '../service/branch-categories.service';
import { User } from 'src/app/front-end/models/login.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-branch-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {


  categories: Array<ServiceCategoryModel>
  services: Array<ServiceModel>
  servicesAll: Array<ServiceModel>

  constructor(private cService: CommonService, private modalService: NgbModal, private servicesService: ServiceAndCategoryServices) { }
  inProgress: boolean
  category_id: number = 0;
  currentUser: User
  isBranchPannel: boolean;
  ngOnInit() {
    this.inProgress = false;
    this.categories = new Array<ServiceCategoryModel>();
    this.services = new Array<ServiceModel>();
    this.getCategoriesList();
    this.getServicesList();
    this.currentUser = this.cService.getUserProfile();
    this.isBranchPannel = this.currentUser.userType == 'branch';
  }

  categoryList: Array<ServiceCategoryModel>;
  getCategoriesList() {
    this.categoryList = new Array<ServiceCategoryModel>();
    this.servicesService.getCategoryList().subscribe(async response => {
      if (response.isSuccess) {
        let data = [];
        if (response.data && response.data.length > 0) {
          data = response.data.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
        this.categoryList = data;

      }
    }, async error => {
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  getServicesList() {
    this.inProgress = true;
    this.servicesService.getServiceList().subscribe(async response => {
      let data = [];
      if (response.data && response.data.length > 0) {
        data = response.data.sort((a, b) => (a.categoryName > b.categoryName) ? 1 : -1);
      }
      this.services = data;
      this.servicesAll = data;
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  deleteServices(Services: ServiceModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this service!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.servicesService.deleteService(Services.id).subscribe(async response => {
            this.inProgress = false;
            this.getServicesList();
            if (response.isSuccess) {
              this.cService.getToaster('Appointment deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

  addEditNewService(serviceId: number) {
    window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/manage-service/" + serviceId;
  }

  updatedServiceStatus(serviec: ServiceModel, status: string) {
    serviec.status = status;
    this.servicesService.updateService(serviec).subscribe(async response => {
      this.cService.getToaster('Service status updated succesfully', 'success', 'Success');
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
      if (this.services && this.services.length > 0) {
        this.services.forEach(p => p.isSelected = true);
      }
      this.hideDeleteSelectedBtn = true;
    } else {
      this.selectedAll = false;
      if (this.services && this.services.length > 0) {
        this.services.forEach(p => p.isSelected = false);
      }
      this.hideDeleteSelectedBtn = false;
    }
  }

  change(appointment: ServiceModel, event) {
    if (event.target.checked) {
      appointment.isSelected = true;
    } else {
      appointment.isSelected = false;
    }
    if (this.services.some(p => p.isSelected)) {
      this.hideDeleteSelectedBtn = true;
    } else {
      this.hideDeleteSelectedBtn = false;
    }

  }

  deleteSelected() {
    this.selectedIds = new Array<number>();
    this.services.forEach(p => {
      if (p.isSelected) {
        this.selectedIds.push(p.id);
      }
    });

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this services!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'NO'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.servicesService.deleteMultipleServices(this.selectedIds).subscribe(async response => {
            this.inProgress = false;
            this.getServicesList();
            if (response.isSuccess) {
              this.cService.getToaster('Appointments deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

  currentSelected: ServiceModel;
  viewClient(content, client: ServiceModel) {
    this.currentSelected = new ServiceModel();
    this.currentSelected = client;
    this.modalService.open(content, { size: "md", backdrop: "static" });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  // --------------------------------Filtering  ------------------------------------

  showFilter: boolean = false;
  filterType: string = "";
  filterValue: any = null;

  hideShowFilter() {
    this.showFilter = !this.showFilter;
    this.filterValue = null;
    this.filterType = '';
  }

  getFilteredDataList() {
    this.services = new Array<ServiceModel>();
    if (this.filterType != '') {
      if (this.filterType == 'category') {
        this.services = this.servicesAll.filter(p => p.categoryId == this.filterValue);
      } else if (this.filterType == 'status') {
        this.services = this.servicesAll.filter(p => p.status.toLowerCase() == this.filterValue.toLowerCase());
      } else if (this.filterType == 'name') {
        this.services = this.servicesAll.filter(p => p.name.toLowerCase().includes(this.filterValue.toLowerCase()));
      }
    }
  }

  resetFilter() {
    this.services = this.servicesAll;
    this.filterValue = null;
    this.filterType = '';
    this.showFilter = false;
  }

  // --------------------------------Reporting and Printing ------------------------------------
  isPrintView: boolean = false;
  hideShowPrintView() {
    this.isPrintView = !this.isPrintView;
  }
  getDuration(mintues: number): string {
    if (mintues) {
      if (mintues == 60) {
        return '1 Hours';
      } else if (mintues == 90) {
        return '1.5 Hours';
      } else if (mintues == 120) {
        return '2 Hours';
      } else if (mintues == 75) {
        return '1.25 Hours';
      } else if (mintues == 105) {
        return '1.75 Hours';
      } else if (mintues == 45) {
        return '45 Mintues';
      } else {
        return mintues + ' Mintues'
      }
    }
  }
  downloadXslx(): void {
    let element = document.getElementById('table-xsls');
    this.cService.download_XLSX(element, 'Clients List')
    this.isPrintView = false;
  }
}
