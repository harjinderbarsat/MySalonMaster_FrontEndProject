import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { EmployeeModel } from '../models/employee-model.model';
import { EmployeeService } from '../service/employee.service';
import { AdminService } from '../service/admin.service';
import { LoginService } from 'src/app/front-end/services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private modalService: NgbModal, public cService: CommonService, private employeeService: EmployeeService, private adminService: AdminService, private loginService: LoginService, private cookieService: CookieService) { }
  inProgress: boolean
  employeesList: Array<EmployeeModel>;
  currentUser: User
  ngOnInit() {
    this.currentUser = this.cService.getUserProfile();
    this.inProgress = false;
    this.employeesList = new Array<EmployeeModel>();
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.inProgress = true;
    this.adminService.getAdminList().subscribe(async response => {
      this.employeesList = response.data;
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  deleteEmployee(employee: EmployeeModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this client!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.adminService.deleteAdmin(employee.id).subscribe(async response => {
            this.inProgress = false;
            this.getEmployeeList();
            if (response.isSuccess) {
              this.cService.getToaster('Admin deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

  addEditEmployee(id: number) {
    window.location.href = window.location.origin + "/#/super-admin/manage-admin/" + id;
  }

  updatedEmployeeStatus(employee: EmployeeModel, status: string) {
    this.inProgress = true;

    employee.status = status;
    this.adminService.updateAdmin(employee).subscribe(async response => {
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  currentSelected: EmployeeModel;
  viewEmployee(content, emp: EmployeeModel) {
    this.currentSelected = new EmployeeModel();
    this.currentSelected = emp;
    this.modalService.open(content, { size: "lg", backdrop: "static" });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  // Delete Multiple Funcationality 
  selectedAll: boolean = false;
  hideDeleteSelectedBtn: boolean = false;
  selectedIds: Array<number>;

  selectAll(event) {
    if (event.target.checked) {
      this.selectedAll = true;
      if (this.employeesList && this.employeesList.length > 0) {
        this.employeesList.forEach(p => p.isSelected = true);
      }
      this.hideDeleteSelectedBtn = true;
    } else {
      this.selectedAll = false;
      if (this.employeesList && this.employeesList.length > 0) {
        this.employeesList.forEach(p => p.isSelected = false);
      }
      this.hideDeleteSelectedBtn = false;
    }
  }

  change(client: EmployeeModel, event) {
    if (event.target.checked) {
      client.isSelected = true;
    } else {
      client.isSelected = false;
    }

    if (this.employeesList.some(p => p.isSelected)) {
      this.hideDeleteSelectedBtn = true;
    } else {
      this.hideDeleteSelectedBtn = false;
    }
  }

  deleteSelected() {
    this.selectedIds = new Array<number>();
    this.employeesList.forEach(p => {
      if (p.isSelected) {
        this.selectedIds.push(p.id);
      }
    });

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover these Admins!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'NO'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.adminService.deleteMultipleAdmins(this.selectedIds).subscribe(async response => {
            this.inProgress = false;
            this.getEmployeeList();
            if (response.isSuccess) {
              this.cService.getToaster('Admins deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }


  loginEmployee(employee) {
    this.login(employee);
  }



  login(employee) {
    this.inProgress = true;
    this.loginService.login({ username: employee.username, password: employee.passcode }).subscribe(async response => {
      if (response != null && response.access_token) {
        this.cService.setUserToken(response.access_token);
        this.loginService.getUserDetails().subscribe(async userData => {
          if (userData != null && userData) {
            localStorage.removeItem('userData');
            localStorage.removeItem('token');

            this.cookieService.delete('token');
            this.cookieService.delete('userData');

            this.cookieService.set('token', response.access_token);
            this.cookieService.set('userData', JSON.stringify(userData.data));
            localStorage.setItem('userData', JSON.stringify(userData.data));

            this.cService.setCurrentLoginUser(userData.data);

            window.location.href = window.location.origin + "/#/admin/dashboard";

            this.inProgress = false;
          }
        });
      } else {
        this.cService.getToaster('Login Failed', 'error', 'Error');
        this.inProgress = false;
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Login Failed', 'error', 'Error');
    });


  }

}
