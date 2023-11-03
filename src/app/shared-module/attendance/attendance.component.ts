import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeAttendance, EmployeeModel } from '../models/employee-model.model';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private modalService: NgbModal, public cService: CommonService, private employeeService: EmployeeService) { }


  ngOnInit() {
    this.currentLoginUser = this.cService.getUserProfile();
    if (this.currentLoginUser.userType != 'employee') {
      this.getEmployeeList();
    } else {
      this.getEmployeeAttendance(null);
    }
    this.employeeCode = 0;
  }
  currentLoginUser: User = new User();
  inProgress: boolean = false;
  employeesAttendanceList: Array<EmployeeAttendance> = new Array<EmployeeAttendance>();
  employeeCode: number;
  employeesList: Array<EmployeeModel>;

  getEmployeeAttendance(event) {
    if (this.currentLoginUser.userType == 'employee') {
      this.employeeCode = this.currentLoginUser.employeeId;
    } else {
      this.employeeCode = event.target.value;
    }
    if (this.employeeCode != 0) {
      this.inProgress = true;
      this.employeeService.getAttendanceRecordsByEmployeeId(this.employeeCode).subscribe(async response => {
        this.employeesAttendanceList = response.data;
        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    } else {
      this.cService.getToaster('Select Employee', 'warning', 'Error');
    }
  }

  getEmployeeList() {
    this.inProgress = true;
    this.employeesList = new Array<EmployeeModel>();
    this.employeeService.getEmployeeList().subscribe(async response => {
      this.employeesList = response.data;
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }


}
