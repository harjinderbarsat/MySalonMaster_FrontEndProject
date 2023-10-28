import { Component, Output, EventEmitter, OnInit } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/front-end/services/login.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrls: ['./employee-navbar.component.css']
})
export class EmployeeNavbarComponent implements OnInit {

  currentLang = "en";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  public isCollapsed = true;
  layoutSub: Subscription;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};

  constructor(private cookieService: CookieService, private loginService: LoginService,public commonService: CommonService) {
  }

  ngOnInit() {
    this.isCollapsed = false;
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName("app-sidebar")[0];
    if (appSidebar.classList.contains("hide-sidebar")) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }

  logout() {
     
    this.loginService.logout().subscribe(async response => {
      this.commonService.setUserToken('');
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      this.cookieService.delete('token');
      this.cookieService.delete('userData');
      window.location.href = window.location.origin + "/#/login";
    }, async error => {
       
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      this.cookieService.delete('token');
      this.cookieService.delete('userData');
      window.location.href = window.location.origin + "/#/login";
    });
  }
}
