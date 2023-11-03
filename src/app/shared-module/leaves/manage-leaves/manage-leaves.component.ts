import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { LeavesModel } from '../../models/leaves.model';
import { LeavesService } from '../../service/leaves.service';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/front-end/models/login.model';
import { EmployeeModel } from '../../models/employee-model.model';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-manage-leaves',
  templateUrl: './manage-leaves.component.html',
  styleUrls: ['./manage-leaves.component.css']
})
export class ManageLeavesComponent implements OnInit {

  isEditMode: boolean;
  inProgress: boolean;
  id: number;
  public leavesForm: FormGroup;
  leavesInfo: LeavesModel;

  ngbStartFrom: NgbDateStruct;
  ngbEndAt: NgbDateStruct;
  ngbApplyDate: NgbDateStruct;
  ngbApprovedDate: NgbDateStruct;

  currentUser: User


  constructor(public activeRoute: ActivatedRoute, private employeeService: EmployeeService, public datePipe: DatePipe, public cService: CommonService, public fb: FormBuilder, private leavesService: LeavesService) { }

  ngOnInit() {
    this.inProgress = false;
    this.leavesInfo = new LeavesModel();


    this.leavesForm = this.fb.group({
      startFrom: ['', Validators.required],
      endAt: ['', Validators.required],
      halfDay: ['', Validators.required],
      shortLeave: ['', ''],
      employee_id: []
    });
    this.id = this.activeRoute.snapshot.params.id;


    if (this.id == 0) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getLeaves(this.id)
    }
    this.currentUser = this.cService.getUserProfile();
    if (this.currentUser.userType != 'employee')
      this.getEmployeeList();
  }

  getLeaves(leavesId: number) {
    this.leavesService.getLeavesById(leavesId).subscribe(async response => {
      this.leavesInfo = response.data;

      var startFrom = new Date(this.leavesInfo.startFrom);
      this.ngbStartFrom = new NgbDate(startFrom.getFullYear(), (startFrom.getMonth() + 1), startFrom.getDate());

      var endAt = new Date(this.leavesInfo.endAt);
      this.ngbEndAt = new NgbDate(endAt.getFullYear(), (endAt.getMonth() + 1), endAt.getDate());

      var applyDate = new Date(this.leavesInfo.applyDate);
      this.ngbApplyDate = new NgbDate(applyDate.getFullYear(), (applyDate.getMonth() + 1), applyDate.getDate());

      var approvedDate = new Date(this.leavesInfo.approvedDate);
      this.ngbApprovedDate = new NgbDate(approvedDate.getFullYear(), (approvedDate.getMonth() + 1), approvedDate.getDate());

    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  saveLeaves() {
    if (this.leavesForm.valid) {
      if (this.currentUser.userType != 'employee' && this.leavesInfo && (!this.leavesInfo.employee_id || this.leavesInfo.employee_id.toString() == '0' || this.leavesInfo.employee_id.toString() == '')) {
        this.cService.getToaster('Please select Employee', 'error', 'Error');
      }
      else {
        this.inProgress = true;

        if (this.ngbStartFrom != null && this.ngbStartFrom != undefined) {
          this.leavesInfo.startFrom = this.datePipe.transform(new Date(this.ngbStartFrom.year, (this.ngbStartFrom.month - 1), this.ngbStartFrom.day), 'yyyy-MM-dd');
        }
        if (this.ngbEndAt != null && this.ngbEndAt != undefined) {
          this.leavesInfo.endAt = this.datePipe.transform(new Date(this.ngbEndAt.year, (this.ngbEndAt.month - 1), this.ngbEndAt.day), 'yyyy-MM-dd');
        }
        if (this.ngbApplyDate != null && this.ngbApplyDate != undefined) {
          this.leavesInfo.applyDate = this.datePipe.transform(new Date(this.ngbApplyDate.year, (this.ngbApplyDate.month - 1), this.ngbApplyDate.day), 'yyyy-MM-dd');
        }
        if (this.ngbApprovedDate != null && this.ngbApprovedDate != undefined) {
          this.leavesInfo.approvedDate = this.datePipe.transform(new Date(this.ngbApprovedDate.year, (this.ngbApprovedDate.month - 1), this.ngbApprovedDate.day), 'yyyy-MM-dd');
        }

        if (this.isEditMode) {
          this.leavesService.updateLeaves(this.leavesInfo).subscribe(async response => {
            this.cService.getToaster('Leaves updated succesfully', 'success', 'Success');
            window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/leaves";
            this.inProgress = false;
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });
        } else {
          this.leavesService.saveLeaves(this.leavesInfo).subscribe(async response => {
            this.cService.getToaster('Leaves saved succesfully', 'success', 'Success');
            window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/leaves";
            this.inProgress = false;
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });
        }
      }
    }
    else
    {
      this.cService.getToaster('Please enter all the required fields', 'error', 'Error');
    }
  }

  employeesList: Array<EmployeeModel>;
  getEmployeeList() {
    this.employeesList = new Array<EmployeeModel>();
    this.employeeService.getEmployeeList().subscribe(async response => {
      this.employeesList = response.data;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Somthing went wrong', 'error', 'Error');
    });
  }
}