import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel, User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import { SUPER_ADMIN_ROUTES } from './sidebar-routes.config';


declare var $: any;
@Component({
  selector: 'super-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SuperAdminSidebarComponent implements OnInit {

  public menuItems: any[];
  isAdminUser: boolean;
  SideMenuTitle: string;
  currentUser: User
  userName = "Super Admin";
  constructor(private router: Router, private cService: CommonService,) { }
  ngOnInit() {
    this.currentUser = this.cService.getUserProfile();
    this.isAdminUser = this.currentUser.user_type == 'admin';
    this.SideMenuTitle = "System Admin";
    $.getScript('./assets/apex-v6.0/js/app-sidebar.js');
    this.menuItems = SUPER_ADMIN_ROUTES.filter(menuItem => menuItem);
    if (this.currentUser && this.currentUser.username) {
      this.userName = this.currentUser.username;
    }
  }
  onClickSidebarLink(path: string) {
  }
}
