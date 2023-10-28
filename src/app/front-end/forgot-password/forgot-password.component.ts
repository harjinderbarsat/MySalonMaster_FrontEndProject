import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService, private cService: CommonService) { }
  emailPattern: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  ngOnInit() {
    this.inProgress=false;
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }

  public forgotForm: FormGroup;
  email:string
  inProgress:boolean
  resetPassword() {
    if (this.forgotForm.valid) {
      this.inProgress=true;
      this.loginService.forgotPassword(this.email).subscribe(async response => {
        this.inProgress=false;
        if (response != null && response.isSuccess == true) {
          this.cService.getToaster('Eamil sent to you to recover password', 'Success', 'Success');
          this.forgotForm.reset();
          window.location.href = window.location.origin + "/#/login"
        }
      }, async error => {
        this.inProgress=false;
        this.cService.getToaster('Password Reset Failed', 'error', 'Error');
      });
    }
  }

}
