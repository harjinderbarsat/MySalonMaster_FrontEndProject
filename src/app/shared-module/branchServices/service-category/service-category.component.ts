import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceCategoryModel } from 'src/app/shared-module/models/servic.model';
import Swal from 'sweetalert2';
import { ServiceAndCategoryServices } from '../../service/branch-categories.service';
import { User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-service-category',
  templateUrl: './service-category.component.html',
  styleUrls: ['./service-category.component.css']
})
export class ServiceCategoryComponent implements OnInit {

  constructor(private modalService: NgbModal, private cService: CommonService, private servicesService: ServiceAndCategoryServices) { }
  inProgress: boolean
  categories: Array<ServiceCategoryModel>
  selectedCategory: ServiceCategoryModel
  currentUser: User
  isBranchPannel: boolean;

  ngOnInit() {
    this.inProgress = false;
    this.categories = new Array<ServiceCategoryModel>();
    this.getCategoryList();
    this.currentUser = this.cService.getUserProfile();
    this.isBranchPannel = this.currentUser.userType == 'branch';
  }

  openCategoryModal(content, category: ServiceCategoryModel, isEditMode: boolean) {
    this.selectedCategory = new ServiceCategoryModel();
    this.selectedCategory.status = '1';
    if (isEditMode) {
      this.selectedCategory = category;
    }
    this.modalService.open(content, { size: "lg", backdrop: "static" });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  saveCategory() {

    if (!this.selectedCategory.name || this.selectedCategory.name == '') {
      this.cService.getToaster('Kindly enter categoty name.', 'info', 'Name Required');
      return
    }

    this.inProgress = true;
    if (this.selectedCategory.id) {
      this.servicesService.updateCategory(this.selectedCategory).subscribe(async response => {
        this.cService.getToaster('Category updated succesfully', 'success', 'Success');
        this.inProgress = false;
        this.getCategoryList();

      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    } else {
      this.servicesService.saveCategory(this.selectedCategory).subscribe(async response => {
        this.cService.getToaster('Category saved succesfully', 'success', 'Success');
        this.inProgress = false;
        this.getCategoryList();

      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    }
    this.modalService.dismissAll();
  }

  getCategoryList() {
    this.inProgress = true;
    this.servicesService.getCategoryList().subscribe(async response => {
      if(response.data){
        this.categories = response.data;
      }
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  deleteCategory(category: ServiceCategoryModel) {
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
          this.servicesService.deleteCategory(category.id).subscribe(async response => {
            this.inProgress = false;
            if (response.isSuccess) {
              this.cService.getToaster('Category deleted succesfully', 'success', 'Success');
            }
            this.getCategoryList();
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });
        }
      });
  }

  updatedCategoryStatus(category: ServiceCategoryModel, status: string) {
    category.status = status;
    this.servicesService.updateCategory(category).subscribe(async response => {
      this.cService.getToaster('Category status updated succesfully', 'success', 'Success');
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

  change(appointment: ServiceCategoryModel, event) {
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
      text: 'Once deleted you cannot recover this categories!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'NO'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.servicesService.deleteMultipleCategories(this.selectedIds).subscribe(async response => {
            this.inProgress = false;
            this.getCategoryList();
            if (response.isSuccess) {
              this.cService.getToaster('Appointments deleted categories', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

  currentSelected: ServiceCategoryModel;
  viewClient(content, client: ServiceCategoryModel) {
    this.currentSelected = new ServiceCategoryModel();
    this.currentSelected = client;
    this.modalService.open(content, { size: "md", backdrop: "static" });
  }

}
