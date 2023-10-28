import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee_ROUTES } from './sidebar-routes.config';
 
declare var $: any;
@Component({
  selector: 'app-employee-sidebar',
  templateUrl: './employee-sidebar.component.html',
  styleUrls: ['./employee-sidebar.component.css']
})
export class EmployeeSidebarComponent implements OnInit {

 
  public menuItems: any[];
  @Input() isAdminUser: boolean;
  @Input() SideMenuTitle: string;

  
  constructor(private router: Router) { }
  ngOnInit() {
    this.SideMenuTitle='EMPLOYEE'
   $.getScript('./assets/apex-v6.0/js/app-sidebar.js');
    this.menuItems = Employee_ROUTES.filter(menuItem => menuItem);
  }
  onClickSidebarLink(path: string) {
  }
}
