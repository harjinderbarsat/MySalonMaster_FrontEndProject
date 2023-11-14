import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeModel } from 'src/app/shared-module/models/employee-model.model';
import { EmployeeService } from 'src/app/shared-module/service/employee.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  constructor(private datePipe: DatePipe, private fb: FormBuilder, private activeRoute: ActivatedRoute, public cService: CommonService,
    private employeeService: EmployeeService, private modalService: NgbModal) { }
  inProgress: boolean
  public branchForm: FormGroup;
  EmployeeModel: EmployeeModel
  id: number;
  currentUser: User;
  ngbDateOfBirth: NgbDateStruct;
  isEditMode: boolean = false;

  ngOnInit() {
    this.EmployeeModel = new EmployeeModel();
    this.currentUser = this.cService.getUserProfile();
    this.getMyProfileDetail();
    this.inProgress = true;
  }

  getMyProfileDetail() {
    this.inProgress = true;
    this.employeeService.getMyProfileDetail().subscribe(async response => {
      this.inProgress = false;
      if (response && response.data) {
        this.EmployeeModel = response.data;

        var addedDate = new Date(this.EmployeeModel.dateOfBirth);
        this.ngbDateOfBirth = new NgbDate(addedDate.getFullYear(), (addedDate.getMonth() + 1), addedDate.getDate());
        this.isEditMode = false;
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  updateEmployee() {
  
    this.inProgress = true;
    if (this.ngbDateOfBirth != null && this.ngbDateOfBirth != undefined) {
      this.EmployeeModel.dateOfBirth = this.datePipe.transform(new Date(this.ngbDateOfBirth.year, (this.ngbDateOfBirth.month - 1), this.ngbDateOfBirth.day), 'yyyy-MM-dd');
    }

    this.employeeService.updateMyProfileDetail(this.EmployeeModel).subscribe(async response => {
      this.inProgress = false;
      if (response.isSuccess) {
        this.getMyProfileDetail();
        this.cService.getToaster('Employee updated succesfully', 'success', 'Success');
      } else {
        this.cService.getToaster('Application error', 'error', 'Error');
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  editProfile() {
    this.isEditMode = true;
  }

}
