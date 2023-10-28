import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';


export const frontEndRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'thank-you/:email', component: ThankYouComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password/:email/:token', component: ResetPasswordComponent },
      { path: 'email-verification/:id', component: EmailVerificationComponent },
       
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(frontEndRoutes)
  ],
  exports: [RouterModule],
})
export class FrontEndRoutingModule { }
