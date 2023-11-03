import { Component, OnInit } from '@angular/core';
import { LoginModel, User } from '../front-end/models/login.model';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private cService: CommonService) { }
  currentUser: User
  isAdmin: boolean
  sideMenuTitle: string
  ngOnInit() {
    this.currentUser = this.cService.getUserProfile();
    this.isAdmin = this.currentUser.userType === 'admin';
    this.sideMenuTitle = this.currentUser.username;
  }

}
