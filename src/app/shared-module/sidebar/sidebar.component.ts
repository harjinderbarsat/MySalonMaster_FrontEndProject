import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel, User } from 'src/app/front-end/models/login.model';
import { CommonService } from 'src/app/services/common.service';
import { BRANCH_PANEL_ROUTES } from './sidebar-routes.config';


declare var $: any;
@Component({
  selector: 'branch-app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class BranchSidebarComponent implements OnInit {

  public menuItems: any[];
  isAdminUser: boolean;
  SideMenuTitle: string;
  currentUser: User
  userName: string = 'Branch';
  constructor(private router: Router, private cService: CommonService,) { }
  ngOnInit() {
    this.currentUser = this.cService.getUserProfile();
    this.SideMenuTitle = 'Branchsd';
    this.isAdminUser = true;
    $.getScript('./assets/apex-v6.0/js/app-sidebar.js');
    this.menuItems = BRANCH_PANEL_ROUTES.filter(menuItem => menuItem);
    if (this.currentUser && this.currentUser.username) {
      this.userName = this.currentUser.username;
    }
  }
  onClickSidebarLink(path: string) {
  }
}
