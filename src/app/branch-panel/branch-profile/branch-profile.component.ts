import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import { BranchModel } from 'src/app/shared-module/models/branch-model.model';
import { BranchsServiceService } from 'src/app/shared-module/service/branchs-service.service';


@Component({
  selector: 'app-branch-profile',
  templateUrl: './branch-profile.component.html',
  styleUrls: ['./branch-profile.component.css']
})
export class BranchProfileComponent implements OnInit {

  constructor(private datePipe: DatePipe, private fb: FormBuilder, private activeRoute: ActivatedRoute, private cService: CommonService,
    private branchService: BranchsServiceService, private modalService: NgbModal) { }
  inProgress: boolean
  public branchForm: FormGroup;
  branchModel: BranchModel
  id: number;
  currentUser: User;
  isEditMode: boolean = false;
  ngOnInit() {

    this.branchModel = new BranchModel();
    this.currentUser = this.cService.getUserProfile();
    this.getBranch(this.currentUser.branchId);
    this.inProgress = false;
  }

  get formAlias() { return this.branchForm.controls; }

  getBranch(branch_id: number) {
    this.inProgress = true;
    this.branchService.getBranchById(branch_id).subscribe(async response => {
      this.inProgress = false;
      if (response && response.data) {
        this.branchModel = response.data;
        this.branchForm = this.fb.group({
          contact: [this.branchModel.contact, [Validators.minLength(10), Validators.maxLength(10)]],
          slot_for_appointment: [this.branchModel.slotForAppointment, [Validators.min(1), Validators.max(10)]],
          address: [this.branchModel.address, ''],
          email: [this.branchModel.email, [Validators.required]],
          number_of_employee: [this.branchModel.numberOfEmployee, [Validators.pattern('^[0-9]+$')]],
          passcode: [this.branchModel.passcode, [Validators.required, Validators.minLength(6)]]
        });
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  saveBranch() {
    if (this.branchForm.invalid) {
      this.cService.getToaster('Kindly Enter Valid Data', 'error', 'Error');
      return
    }
    this.inProgress = true;
    this.branchService.updateBranch(this.branchModel).subscribe(async response => {
      this.inProgress = false;
      if (response.isSuccess) {
        this.cService.getToaster('Branch updated succesfully', 'success', 'Success');
        this.getMyProfileDetail();
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

  getMyProfileDetail() {
    this.isEditMode = false;
    this.getBranch(this.currentUser.branchId);
  }

  updateProfile() {

  }
}
