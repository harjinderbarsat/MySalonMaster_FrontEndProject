import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

import { User } from 'src/app/front-end/models/login.model';
import { LeavesModel, Leaves_Status, Leaves_Type } from '../models/leaves.model';
import { LeavesService } from '../service/leaves.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {

  leaves: Array<LeavesModel>
  constructor(public cService: CommonService, private leavesService: LeavesService) { }
  inProgress: boolean
  currentUser: User
  isAdminUser: boolean = false;
  dataSource: any = {};
  ngOnInit() {
    this.inProgress = false;
    this.leaves = new Array<LeavesModel>();
    this.currentUser = this.cService.getUserProfile();
    this.isAdminUser = this.currentUser.user_type == "admin";
    this.getLeavessList();

  }

  getLeavessList() {
    this.inProgress = true;

    if (this.isAdminUser) {
      this.leavesService.getLeavesList().subscribe(async response => {
        if (response && response.isSuccess && response.data) {
          this.leaves = response.data;
          this.leaves.map(p => { p.status = Leaves_Status[p.status], p.leaveType = Leaves_Type[p.type] })
          this.dataSource = this.leaves;
        }

        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    } else {
      debugger
      this.leavesService.getLeavesByEmployee(this.currentUser.employee_id).subscribe(async response => {
        if (response && response.isSuccess && response.data) {
          this.leaves = response.data;
          this.leaves.map(p => { p.status = Leaves_Status[p.status], p.leaveType = Leaves_Type[p.type] })
          this.dataSource = this.leaves;
        }
        this.inProgress = false;
      }, async error => {
        this.inProgress = false;
        this.cService.getToaster('Application error', 'error', 'Error');
      });
    }

  }

  deleteLeave = (e) => {
    let leaves: LeavesModel = e.row.data;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this leaves!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.leavesService.deleteLeaves(leaves.id).subscribe(async response => {
            this.inProgress = false;
            this.getLeavessList();
            if (response.isSuccess) {
              this.cService.getToaster('Leaves deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });

        }
      });
  }
  approve = (e) => {
    let id = e && e.row && e.row.data ? e.row.data.id : 0;
    this.inProgress = true;
    this.leavesService.approveLeaves(id).subscribe(async response => {
      this.cService.getToaster('Leaves updated succesfully', 'success', 'Success');
      this.getLeavessList();
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  };

  reject = (e) => {
    let id = e && e.row && e.row.data ? e.row.data.id : 0;
    this.inProgress = true;
    this.leavesService.rejectLeaves(id).subscribe(async response => {
      this.cService.getToaster('Leaves updated succesfully', 'success', 'Success');
      this.getLeavessList();
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  viewLeave = (e) => {
    //console.log(e.row.data);
  }
  addLeave = (e) => {
    let id = e && e.row && e.row.data ? e.row.data.id : 0;
    window.location.href = window.location.origin + "/#/" + this.currentUser.user_type + "/manage-leaves/" + id;
  }

  // Delete Multiple Funcationality 
  selectedAll: boolean = false;
  hideDeleteSelectedBtn: boolean = false;
  selectedIds: Array<number>;

  selectAll(event) {
    if (event.target.checked) {
      this.selectedAll = true;
      if (this.leaves && this.leaves.length > 0) {
        this.leaves.forEach(p => p.isSelected = true);
      }
      this.hideDeleteSelectedBtn = true;
    } else {
      this.selectedAll = false;
      if (this.leaves && this.leaves.length > 0) {
        this.leaves.forEach(p => p.isSelected = false);
      }
      this.hideDeleteSelectedBtn = false;
    }
  }

  change(client: LeavesModel, event) {
    if (event.target.checked) {
      client.isSelected = true;
    } else {
      client.isSelected = false;
    }

    if (this.leaves.some(p => p.isSelected)) {
      this.hideDeleteSelectedBtn = true;
    } else {
      this.hideDeleteSelectedBtn = false;
    }
  }

  deleteSelected() {
    this.selectedIds = new Array<number>();
    this.leaves.forEach(p => {
      if (p.isSelected) {
        this.selectedIds.push(p.id);
      }
    });

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover these Leaves!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'NO'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.leavesService.deleteMultipleLeaves(this.selectedIds).subscribe(async response => {
            this.inProgress = false;
            this.hideDeleteSelectedBtn = false;
            this.getLeavessList();
            if (response.isSuccess) {
              this.cService.getToaster('Leaves deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });
        }
      });
  }

  isApproveIconVisible = (e) => {
    return e.row.data.status != 'Approved';
  }

  isRejectedIconVisible = (e) => {
    return e.row.data.status != 'Rejected';
  }

  onSelectionChanged = (e) => {
    let selectedData = e.selectedRowsData;
    this.leaves.forEach(p => {
      let filterItems = selectedData.filter(item => {
        return item.id == p.id;
      });
      if (filterItems.length > 0) {
        p.isSelected = true;
      }
      else {
        p.isSelected = false;
      }
    });
    if (selectedData.length > 0) {
      this.hideDeleteSelectedBtn = true;
    } else {
      this.hideDeleteSelectedBtn = false;
    }
  }

}