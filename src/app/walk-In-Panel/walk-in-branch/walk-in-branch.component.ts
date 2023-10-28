import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/front-end/services/login.service';
import { CommonService } from 'src/app/services/common.service';
import { BranchModel } from 'src/app/shared-module/models/branch-model.model';
import { BranchsServiceService } from 'src/app/shared-module/service/branchs-service.service';

@Component({
  selector: 'app-walk-in-branch',
  templateUrl: './walk-in-branch.component.html',
  styleUrls: ['./walk-in-branch.component.css']
})
export class WalkInBranchComponent implements OnInit {

  constructor(public cService: CommonService, private branchService: BranchsServiceService, private router: ActivatedRoute, private loginService: LoginService, private cookieService: CookieService) { }
  inProgress: boolean
  branchList: Array<BranchModel>;
  ngOnInit() {
    debugger
    //this.logout();
    this.router.queryParams.subscribe(params => {
      if (params.admin_id) {
        this.getBranchList(params.admin_id);
      }
    });
  }

  getBranchList(admin_id) {
    this.inProgress = true;
    this.branchService.getBranchList(admin_id).subscribe(async response => {
      this.branchList = new Array<BranchModel>();
      this.branchList = response.data;
      this.inProgress = false;
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Application error', 'error', 'Error');
    });
  }

  selectBranch(branch) {
    localStorage.removeItem('offlineBranchId');
    this.cookieService.delete('offlineBranchId');
    this.cookieService.set('offlineBranchId', branch.id);
    localStorage.setItem('offlineBranchId', branch.id);
    window.location.href = window.location.origin + "/#/walkIn/clientRegistration/online";
  }
  logout() {
    this.cService.setUserToken('');
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    this.cookieService.delete('token');
    this.cookieService.delete('userData');
    localStorage.removeItem('offlineBranchId');
  }


}
