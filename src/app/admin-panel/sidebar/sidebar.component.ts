import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginModel, User } from 'src/app/front-end/models/login.model';
import { LoginService } from 'src/app/front-end/services/login.service';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeModel } from 'src/app/shared-module/models/employee-model.model';
import { BRANCH_ROUTES } from './sidebar-routes.config';


declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class sidebarComponent implements OnInit {

  public menuItems: any[];
  isAdminUser: boolean;
  SideMenuTitle: string;
  currentUser: User
  userName: string = 'Admin';
  showMySelf: boolean = false;
  originalUser: EmployeeModel
  constructor(private router: Router, private cService: CommonService, private loginService: LoginService, private cookieService: CookieService) { }
  ngOnInit() {
    this.currentUser = this.cService.getUserProfile();
    this.isAdminUser = this.currentUser.userType == 'admin';
    this.SideMenuTitle = this.isAdminUser ? 'Admin' : this.currentUser.name;
    $.getScript('./assets/apex-v6.0/js/app-sidebar.js');
    this.menuItems = BRANCH_ROUTES.filter(menuItem => menuItem);
    if (this.currentUser && this.currentUser.username) {
      this.userName = this.currentUser.username;
    }
    this.originalUser = this.cService.getOriginalUserProfile();
    if (this.originalUser && this.originalUser.username && this.originalUser.username.length > 0) {
      this.showMySelf = true;
    }
    else {
      this.showMySelf = false;
    }
  }
  onClickSidebarLink(path: string) {
  }

  superAdminLogin() {
    this.login(this.originalUser);
  }
  login(employee) {
    //this.inProgress = true;
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

            window.location.href = window.location.origin + "/#/super-admin/dashboard";

            //this.inProgress = false;
          }
        });
      } else {
        this.cService.getToaster('Login Failed', 'error', 'Error');
        //this.inProgress = false;
      }
    }, async error => {
      //this.inProgress = false;
      this.cService.getToaster('Login Failed', 'error', 'Error');
    });


  }

}
