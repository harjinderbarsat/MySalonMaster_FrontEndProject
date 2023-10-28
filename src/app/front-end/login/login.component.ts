import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { ServiceCategoryModel } from 'src/app/shared-module/models/servic.model';
import { LoginModel } from '../models/login.model';
import { EmployeeModel } from 'src/app/shared-module/models/employee-model.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private cService: CommonService, private cookieService: CookieService) { }

  public loginForm: FormGroup;
  public newAppointmentForm: FormGroup;


  loginData: LoginModel = new LoginModel();
  // emailPattern: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  inProgress: boolean
  rMe: boolean;
  categories: Array<ServiceCategoryModel>
  user_type: string;

  ngOnInit() {
    this.loginData = new LoginModel();
    debugger
    this.inProgress = false;

    this.user_type = '';

    this.loginForm = this.fb.group({
      loginType: ['', ''],
      username: ['', [Validators.required]],
      password: ["", [Validators.required]],
    });
    localStorage.removeItem('offlineBranchId');
  }

  user: LoginModel
  login() {
    if (this.loginForm.invalid) {
      return false;
    }
    this.user = new LoginModel()
    this.inProgress = true;
    debugger
    this.loginService.login(this.loginData).subscribe(async response => {
      if (response != null && response.access_token) {
        this.loginForm.reset();
        this.cService.setUserToken(response.access_token);
        this.loginService.getUserDetails().subscribe(async userData => {
          if (userData != null && userData) {
            let employeeModel = new EmployeeModel();
            console.log(userData);
            localStorage.removeItem('userData');
            localStorage.removeItem('token');

            this.cookieService.delete('token');
            this.cookieService.delete('userData');

            if (this.rMe == true) {
              localStorage.setItem('token', JSON.stringify(response.access_token));
            }
            else {
              this.cookieService.set('token', response.access_token);
            }
            this.cookieService.set('userData', JSON.stringify(userData.data));
            localStorage.setItem('userData', JSON.stringify(userData.data));

            this.cService.setCurrentLoginUser(userData.data);
            if (userData.data.user_type == 'branch') {
              window.location.href = window.location.origin + "/#/branch/dashboard";
            } else if (userData.data.user_type == 'admin') {
              window.location.href = window.location.origin + "/#/admin/dashboard";
            } else if (userData.data.user_type == 'employee') {
              window.location.href = window.location.origin + "/#/employee/dashboard";
            } else if (userData.data.user_type == 'system admin') {

              employeeModel.username = this.loginData.username;
              employeeModel.passcode = this.loginData.password;

              window.location.href = window.location.origin + "/#/super-admin/dashboard";
            }
            this.cService.setOriginalUser(employeeModel);
            //this.cService.getToaster('Login Successfully', 'Success', 'Success');
          }
        });
      }
      else if (response.message && response.message.length > 0) {
        this.cService.getToaster(response.message, 'error', 'Error');
        this.inProgress = false;
      } else {
        this.cService.getToaster('Login Failed', 'error', 'Error');
        this.inProgress = false;
      }
    }, async error => {
      this.inProgress = false;
      this.cService.getToaster('Login Failed', 'error', 'Error');
    });


  }

}
