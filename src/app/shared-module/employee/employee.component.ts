import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { EmployeeModel } from '../models/employee-model.model';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-branch-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private modalService: NgbModal, private cService: CommonService, private employeeService: EmployeeService) { }
  inProgress: boolean
  employeesList: Array<EmployeeModel>;
  currentUser: User
  isBranchPannel: boolean;
  ngOnInit() {
    this.currentUser = this.cService.getUserProfile();
    this.isBranchPannel = this.currentUser.userType == 'branch';
    this.inProgress = false;
    this.employeesList = new Array<EmployeeModel>();
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.inProgress = true;
    this.employeeService.getEmployeeList().subscribe(async response => {
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
          this.employeeService.deleteEmployee(employee.id).subscribe(async response => {
            this.inProgress = false;
            this.getEmployeeList();
            if (response.isSuccess) {
              this.cService.getToaster('Employee deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }

  addEditEmployee(id: number) {
    window.location.href = window.location.origin + "/#/" + this.currentUser.userType + "/manage-employee/" + id;
  }

  updatedEmployeeStatus(employee: EmployeeModel, status: string) {
    this.inProgress = true;
    employee.status = status;
    this.employeeService.updateEmployee(employee).subscribe(async response => {
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

  closeModal(){
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
     text: 'Once deleted you cannot recover these Employees!',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Yes',
     cancelButtonText: 'NO'
   })
     .then((willDelete) => {
       if (willDelete.value) {
         this.inProgress = true;
         this.employeeService.deleteMultipleEmployee(this.selectedIds).subscribe(async response => {
           this.inProgress = false;
           this.getEmployeeList();
           if (response.isSuccess) {
             this.cService.getToaster('Employees deleted succesfully', 'success', 'Success');
           }
         }, async error => {
           this.inProgress = false;
           this.cService.getToaster('Application error', 'error', 'Error');
         });

       }
     });
 }

 downloadXslx(): void {
  let element = document.getElementById('table-xsls');
  this.cService.download_XLSX(element, "Employee's List")
}

}
