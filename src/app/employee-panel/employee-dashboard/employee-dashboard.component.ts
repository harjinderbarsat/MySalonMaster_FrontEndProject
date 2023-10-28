import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeAttendance } from 'src/app/shared-module/models/employee-model.model';
import { EmployeeService } from 'src/app/shared-module/service/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  constructor(private modalService: NgbModal, private cService: CommonService, private employeeService: EmployeeService) { }


  ngOnInit() {
    this.currentLoginUser = this.cService.getUserProfile();
  }
  currentLoginUser: User = new User();
  inProgress: boolean = false;



}
