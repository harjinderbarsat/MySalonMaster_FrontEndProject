import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { ResetPassword } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder , private loginService: LoginService, private cService: CommonService, private activeRoute: ActivatedRoute) { }
  public resetForm: FormGroup;
  userModel: ResetPassword

  MatchPassword(AC: AbstractControl) {
    let password = AC.get('newPassword').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password != confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true })
    } else {
      return null
    }
  }
 token:string
 email:string
 inProgress:boolean
  ngOnInit() {
    this.userModel =new ResetPassword();
    this.inProgress=false;
    this.email = this.activeRoute.snapshot.params.email;
    this.token = this.activeRoute.snapshot.params.token;
    this.userModel = new ResetPassword();
    this.resetForm = this.fb.group({
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
    }, {
      validator: this.MatchPassword // your validation method
    });
  }

  // resetPassword() {
  //   if (this.resetForm.valid) {
  //     this.cService.getToaster('Password Reset Successfully', 'Success', 'Success');
  //     window.location.href = window.location.origin + "/#/login"
  //   }
  // }


  resetPassword() {
    if (this.resetForm.valid) {
      this.inProgress=true;
      this.userModel.email=this.email;
      this.userModel.token=this.token;
      this.loginService.ResetPassword(this.userModel).subscribe(async response => {
        this.inProgress=false;
        if (response != null && response.isSuccess == true) {
          this.cService.getToaster('Password Reset Successfully', 'Success', 'Success');
          this.resetForm.reset();
          window.location.href = window.location.origin + "/#/login"
        }
      }, async error => {
        this.inProgress=false;
        this.cService.getToaster('Password Reset Failed', 'error', 'Error');
      });
    }
  }


}
