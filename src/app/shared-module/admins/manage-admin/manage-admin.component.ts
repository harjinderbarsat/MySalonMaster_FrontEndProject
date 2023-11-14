import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
//import { EmployeeService } from '../../service/employee.service';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmployeeModel } from '../../models/employee-model.model';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/front-end/models/login.model';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})
export class ManageAdminComponent implements OnInit {
  isEditMode: boolean;
  inProgress: boolean;
  id: number;
  public employeeForm: FormGroup;
  employeeInfo: EmployeeModel;
  ngbDateOfBirth: NgbDateStruct;
  ngbDateOfJoining: NgbDateStruct;
  currentUser: User
  ngbStartDate: NgbDateStruct;
  ngbEndDate: NgbDateStruct;
  isSubmitted: boolean = false;
  constructor(private activeRoute: ActivatedRoute, private datePipe: DatePipe, private cService: CommonService, private fb: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    this.inProgress = false;
    this.employeeInfo = new EmployeeModel();
    this.currentUser = this.cService.getUserProfile();

    this.employeeForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      mobile: ['', ''],
      email: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9_]+$')]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      status: ['1', Validators.required],
      planStartDate: [null, null],
      planEndDate: [null, null],
    });
    this.id = this.activeRoute.snapshot.params.id;

    if (this.id == 0) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getEmployee(this.id)
    }

  }
  get formAlias() { return this.employeeForm.controls; }

  getEmployee(employee_id: number) {
    this.adminService.getAdminDetail(employee_id).subscribe(async response => {
      this.employeeInfo = response.data;
      debugger
      if (this.employeeInfo.planStartDate) {
        var addedDate = new Date(this.employeeInfo.planStartDate);
        this.ngbStartDate = new NgbDate(addedDate.getFullYear(), (addedDate.getMonth() + 1), addedDate.getDate());
      }
      if (this.employeeInfo.planEndDate) {
        var addedDate = new Date(this.employeeInfo.planEndDate);
        this.ngbEndDate = new NgbDate(addedDate.getFullYear(), (addedDate.getMonth() + 1), addedDate.getDate());
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  saveEmployee() {
    this.isSubmitted = true;
    if (this.employeeForm.valid) {
      this.inProgress = true;

      if (this.ngbStartDate != null && this.ngbStartDate != undefined) {
        this.employeeInfo.planStartDate = this.datePipe.transform(new Date(this.ngbStartDate.year, (this.ngbStartDate.month - 1), this.ngbStartDate.day), 'yyyy-MM-dd');
      }
      if (this.ngbEndDate != null && this.ngbEndDate != undefined) {
        this.employeeInfo.planEndDate = this.datePipe.transform(new Date(this.ngbEndDate.year, (this.ngbEndDate.month - 1), this.ngbEndDate.day), 'yyyy-MM-dd');
      }

      this.employeeInfo.adminId = this.id;
      if (this.isEditMode) {
        this.employeeInfo.name = this.employeeInfo.firstname + ' ' + this.employeeInfo.lastname;
        this.employeeInfo.adminId = this.id;
        this.adminService.updateAdmin(this.employeeInfo).subscribe(async response => {
          if (response && response.error) {
            let errors = this.getErrorDetails(response.error);
            this.cService.getToaster(errors, 'error', 'Error');
          }
          else {
            this.cService.getToaster('Admin updated succesfully', 'success', 'Success');
            window.location.href = window.location.origin + "/#/super-admin/admins";
          }
          this.inProgress = false;
        }, async error => {
          this.inProgress = false;
          this.cService.getToaster('Application error', 'error', 'Error');
        });
      } else {
        this.employeeInfo.name = this.employeeInfo.firstname + ' ' + this.employeeInfo.lastname;
        this.adminService.saveAdmin(this.employeeInfo).subscribe(async response => {
          if (response && response.error) {
            let errors = this.getErrorDetails(response.error);
            this.cService.getToaster(errors, 'error', 'Error');
          }
          else {
            this.cService.getToaster('Admin saved succesfully', 'success', 'Success');
            window.location.href = window.location.origin + "/#/super-admin/admins";
          }

          this.inProgress = false;
        }, async error => {
          this.inProgress = false;
          this.cService.getToaster('Application error', 'error', 'Error');
        });
      }
    }
  }
  back() {
    window.location.href = window.location.origin + "/#/super-admin/admins";
  }

  getErrorDetails(error) {
    let errorHTML = '';
    for (const key in error) {
      errorHTML += error[key].toString() + ', ';
    }
    return errorHTML;
  }

}
