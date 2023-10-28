import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FrontEndComponent } from './front-end.component';
import { FrontEndRoutingModule, frontEndRoutes } from './front-end-routing.module';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';



@NgModule({
  declarations: [FrontEndComponent,
    LoginComponent,
    ThankYouComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EmailVerificationComponent,
  ],
  imports: [
    CommonModule,
    FrontEndRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule.forChild(),
    LocalizeRouterModule.forChild(frontEndRoutes)
    // UiSwitchModule
  ],providers:[DatePipe],
    bootstrap: [FrontEndComponent],
})
export class FrontEndModule { }
