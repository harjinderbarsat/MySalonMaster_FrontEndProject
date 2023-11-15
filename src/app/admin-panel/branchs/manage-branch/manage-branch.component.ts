
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { ServiceCategoryModel, ServiceModel } from 'src/app/shared-module/models/servic.model';
import { ServiceAndCategoryServices } from 'src/app/shared-module/service/branch-categories.service';
import { BranchModel, BranchPermissionCategoryModel, BranchPermissionModel } from '../../../shared-module/models/branch-model.model';
import { BranchsServiceService } from '../../../shared-module/service/branchs-service.service';

@Component({
  selector: 'app-manage-branch',
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.css']
})
export class ManageBranchComponent implements OnInit {

  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private cService: CommonService,
    private branchService: BranchsServiceService, private modalService: NgbModal, private datePipe: DatePipe, private servicesService: ServiceAndCategoryServices) { }

  inProgress: boolean;
  isEditMode: boolean;
  public branchForm: FormGroup;
  branchModel: BranchModel
  id: number;
  ngbOpendDate: NgbDateStruct;
  inProgressPermissions: boolean;

  branchServicePermissions: BranchPermissionModel;

  ngOnInit() {
    this.branchModel = new BranchModel();
    this.branchModel.slotForAppointment = 1;
    this.branchModel.status = '1';
    this.id = this.activeRoute.snapshot.params.id;
    if (this.id == 0) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getBranch(this.id)
    }
    this.branchForm = this.fb.group({
      name: ['', ''],
      code: ['', [Validators.required]],
      passCode: ['', [Validators.required]],
      opendOn: ['', ''],
      noOfEmp: ['', ''],
      slotOfApp: ['', ''],
      mobile: ['', ''],
      email: ['', ''],
      status: ['', ''],
      address: ['', '']
    });
    this.getServices();
  }

  getBranch(branch_id: number) {
    this.inProgress = true;
    this.branchService.getBranchById(branch_id).subscribe(async response => {
      this.inProgress = false;
      this.branchModel = response.data;
      this.getServices();
      var addedDate = new Date(this.branchModel.openedOn);
      this.ngbOpendDate = new NgbDate(addedDate.getFullYear(), (addedDate.getMonth() + 1), addedDate.getDate());
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  addUpdateBranch() {

    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }
    this.inProgress = true;
    if (this.ngbOpendDate != null && this.ngbOpendDate != undefined) {
      this.branchModel.openedOn = this.datePipe.transform(new Date(this.ngbOpendDate.year, (this.ngbOpendDate.month - 1), this.ngbOpendDate.day), 'yyyy-MM-dd');
    }

    if (this.isEditMode) {
      this.branchService.updateBranch(this.branchModel).subscribe(async response => {
        this.inProgress = false;
        if (response.isSuccess) {
          this.cService.getToaster('Branch updated succesfully', 'success', 'Success');
          window.location.href = window.location.origin + "/#/admin/storeList";

        } else if (response.message && response.message.length > 0) {
          this.cService.getToaster(response.message, 'error', 'Error');
        } else {
          this.cService.getToaster('Application error', 'error', 'Error');
        }
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });

    } else {
      this.branchService.saveBranch(this.branchModel).subscribe(async response => {
        this.inProgress = false;
        if (response.isSuccess) {
          this.branchModel = response.data;
          this.cService.getToaster('Branch added succesfully', 'success', 'Success');
          window.location.href = window.location.origin + "/#/admin/storeList";
        }
        else if (response.message && response.message.length > 0) {
          this.cService.getToaster(response.message, 'error', 'Error');
        } else {
          this.cService.getToaster('Application error', 'error', 'Error');
        }
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    }
  }

  editBranch() {
    this.isEditMode = true;
  }

  services: Array<ServiceModel>
  getServices() {
    this.inProgress = false;
    this.inProgressPermissions = true;
    this.services = new Array<ServiceModel>();
    this.servicesService.getServiceList().subscribe(async response => {
      if (response.isSuccess && response.data && response.data.length > 0) {
        this.services = response.data;
        this.getCategoriesList();
      }
      this.inProgressPermissions = false;
    }, async error => {
      this.inProgressPermissions = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  categories: Array<ServiceCategoryModel>
  getCategoriesList() {
    this.categories = new Array<ServiceCategoryModel>();
    this.servicesService.getCategoryList().subscribe(async response => {

      if (response.isSuccess && response.data && response.data.length > 0) {
        let catData = response.data.filter(item => {
          if (item)
            return item;
        });
        this.categories = catData;
        this.categories.forEach(l => {
          l.services = new Array<ServiceModel>();
          l.services = this.services.filter(p => p.categoryId == l.id);
        })
        this.getServicePermissions();
      }
    }, async error => {
      this.cService.getToaster('Application error', 'error', 'Error');
      this.inProgressPermissions = false;
    });
  }

  alreadySelectedServices: Array<number>;
  getServicePermissions() {
    debugger
    this.alreadySelectedServices = new Array<number>();
    this.branchService.getServiceAccess(this.id).subscribe(async response => {
      if (response.isSuccess) {
        if (response.data && response.data.length > 0) {

          response.data.forEach(category => {
            if (category.serviceIds && category.serviceIds.length > 0) {
              category.serviceIds.forEach(service => {
                this.alreadySelectedServices.push(service.id);
              })
            }
          });
        }

        this.categories.forEach(cat => {
          cat.services.forEach(ser => {
            if (this.alreadySelectedServices.includes(ser.id)) {
              ser.isSelected = true;
            }
          })
        });

      } else {
        this.cService.getToaster('Application error', 'error', 'Error');
      }
      this.inProgressPermissions = false;
    }, async error => {
      this.inProgressPermissions = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  onSelectDeselect(serviceModel: ServiceModel) {
    serviceModel.isSelected = !serviceModel.isSelected;
  }

  branchPermissionCategoryModel: BranchPermissionCategoryModel;
  updatePermissions() {
    this.inProgressPermissions = true;
    this.branchServicePermissions = new BranchPermissionModel();
    this.branchServicePermissions.categories = new Array<BranchPermissionCategoryModel>();

    this.categories.forEach(p => {
      this.branchPermissionCategoryModel = new BranchPermissionCategoryModel();

      this.branchPermissionCategoryModel.services = new Array<number>();
      p.services.forEach(k => {
        if (k.isSelected) {
          this.branchPermissionCategoryModel.services.push(k.id);
        }
      });
      if (this.branchPermissionCategoryModel.services && this.branchPermissionCategoryModel.services.length > 0) {
        this.branchPermissionCategoryModel.categoryId = p.id;
      }
      if (this.branchPermissionCategoryModel.services.length > 0) {
        this.branchServicePermissions.categories.push(this.branchPermissionCategoryModel);
      }
    });

    this.branchServicePermissions.branchId = this.id;
    this.branchService.saveServiceAccess(this.branchServicePermissions).subscribe(async response => {
      this.inProgressPermissions = false;
      if (response.isSuccess) {
        this.cService.getToaster('Permissions updated succesfully', 'success', 'Success');
        this.getServicePermissions();
      } else {
        this.cService.getToaster('Application error', 'error', 'Error');
      }
    }, async error => {
      this.inProgressPermissions = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

}

