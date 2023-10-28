import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private loginService: LoginService, private cService: CommonService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.verifyEmail();
  }
  id: number
  verifyEmail() {
    if (this.id != undefined && this.id != null) {
      this.loginService.emailVerification(this.id).subscribe(async response => {
        if (response != null && response.isSuccess == true) {
          this.cService.getToaster('Email Verified Successfully', 'Success', 'Success');
          window.location.href = window.location.origin + "/#/login"
        }
      }, async error => {
        if (error != undefined && error != null) {
          if (error.error != undefined && error.error != null) {
            if (error.error.message != undefined && error.error.message != null) {
              console.log(error.error.message);
            }
          }
        }
        this.cService.getToaster(error.error.message, 'error', 'Verification Failed');
        window.location.href = window.location.origin + "/#/login"
      });
    }
  }
}

