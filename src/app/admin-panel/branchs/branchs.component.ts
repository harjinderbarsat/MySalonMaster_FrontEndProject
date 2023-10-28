import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import { BranchModel } from '../../shared-module/models/branch-model.model';
import { BranchsServiceService } from '../../shared-module/service/branchs-service.service';

@Component({
  selector: 'app-branchs',
  templateUrl: './branchs.component.html',
  styleUrls: ['./branchs.component.css']
})
export class BranchsComponent implements OnInit {

  constructor(private modalService: NgbModal,public cService: CommonService, private branchService: BranchsServiceService) { }
  inProgress:boolean
  branchList: Array<BranchModel>;

  ngOnInit() {
    this.getBranchList();
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

  deleteBranch(Branch: BranchModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted you cannot recover this branch!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.inProgress = true;
          this.branchService.deleteBranch(Branch.id).subscribe(async response => {
            this.inProgress = false;
            this.getBranchList();
            if (response.isSuccess) {
              this.cService.getToaster('Branch deleted succesfully', 'success', 'Success');
            }
          }, async error => {
            this.inProgress = false;
            this.cService.getToaster('Application error', 'error', 'Error');
          });}
      });
  }

  addEditBrach(id: number){
  window.location.href = window.location.origin + "/#/admin/manage-store/" + id;
  }

  currentSelected: BranchModel;
  viewBranch(content, branch: BranchModel) {
    this.currentSelected = new BranchModel();
    this.currentSelected = branch;
    this.modalService.open(content, { size: "xl", backdrop: "static" });
  }
  closeModal() {
    this.modalService.dismissAll();
  }

}
