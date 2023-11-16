import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from '../../service/employee.service';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmployeeModel } from '../../models/employee-model.model';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/front-end/models/login.model';
import { BranchsServiceService } from '../../service/branchs-service.service';
import { BranchModel } from '../../models/branch-model.model';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {
  isEditMode: boolean;
  inProgress: boolean;
  id: number;
  public employeeForm: FormGroup;
  employeeInfo: EmployeeModel;
  ngbDateOfBirth: NgbDateStruct;
  ngbDateOfJoining: NgbDateStruct;
  currentUser: User;
  branchList: Array<BranchModel>;


  constructor(private branchService: BranchsServiceService, private activeRoute: ActivatedRoute, private datePipe: DatePipe, private cService: CommonService, private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.inProgress = false;
    this.employeeInfo = new EmployeeModel();
    this.currentUser = this.cService.getUserProfile();
    this.getBranchList();
    this.employeeForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', ''],
      email: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}$')]],
      branchId: ['', [Validators.required]],
      employeeUniqueId: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      dateOfJoining: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ['', ''],
    });
    this.id = this.activeRoute.snapshot.params.id;

    if (this.id == 0) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getEmployee(this.id)
    }

  }

  getBranchList() {
    this.inProgress = true;
    this.branchService.getBranchList().subscribe(async response => {
      this.branchList = new Array<BranchModel>();
      this.branchList = response.data;
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  getEmployee(employee_id: number) {
    this.employeeService.getEmployeeById(employee_id).subscribe(async response => {
      this.employeeInfo = response.data;

      var date_of_birth = new Date(this.employeeInfo.dateOfBirth);
      this.ngbDateOfBirth = new NgbDate(date_of_birth.getFullYear(), (date_of_birth.getMonth() + 1), date_of_birth.getDate());

      var date_of_Join = new Date(this.employeeInfo.dateOfJoining);
      this.ngbDateOfJoining = new NgbDate(date_of_Join.getFullYear(), (date_of_Join.getMonth() + 1), date_of_Join.getDate());


    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  saveEmployee() {

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    this.inProgress = true;

    if (this.ngbDateOfBirth != null && this.ngbDateOfBirth != undefined) {
      this.employeeInfo.dateOfBirth = this.datePipe.transform(new Date(this.ngbDateOfBirth.year, (this.ngbDateOfBirth.month - 1), this.ngbDateOfBirth.day), 'yyyy-MM-dd');
    }
    if (this.ngbDateOfJoining != null && this.ngbDateOfJoining != undefined) {
      this.employeeInfo.dateOfJoining = this.datePipe.transform(new Date(this.ngbDateOfJoining.year, (this.ngbDateOfJoining.month - 1), this.ngbDateOfJoining.day), 'yyyy-MM-dd');
    }

    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeInfo).subscribe(async response => {
        this.cService.getToaster('Employee updated succesfully', 'success', 'Success');
        window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/employees";
        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    } else {
      this.employeeService.saveEmployee(this.employeeInfo).subscribe(async response => {
        this.cService.getToaster('Employee saved succesfully', 'success', 'Success');
        window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/employees";


        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    }
  }

  back(){
    window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/employees";

  }

}
