import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookAnAppointmentComponent } from './book-an-appointment/book-an-appointment.component';
import { CheckInComponent } from './check-in/check-in.component';
import { FinalConfirmationComponent } from './final-confirmation/final-confirmation.component';
import { WalkInAppointmentTimeComponent } from './walk-in-appointment-time/walk-in-appointment-time.component';
import { WalkInPanelRegistrationComponent } from './walk-in-panel-registration/walk-in-panel-registration.component';
import { WalkInPaymentComponent } from './walk-in-payment/walk-in-payment.component';
import { WalkInSelectServiceComponent } from './walk-in-select-service/walk-in-select-service.component';
import { WriteReviewsComponent } from './write-reviews/write-reviews.component';
import { WalkInBranchComponent } from './walk-in-branch/walk-in-branch.component';


export const walkInPanelRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'bookAppointment', component: BookAnAppointmentComponent },
      { path: 'finalConfirmation/:id', component: FinalConfirmationComponent },
      { path: 'clientRegistration/:type', component: WalkInPanelRegistrationComponent },
      { path: 'selectServices', component: WalkInSelectServiceComponent },
      { path: 'appointment-time', component: WalkInAppointmentTimeComponent },
      { path: 'payment', component: WalkInPaymentComponent },
      { path: 'writeReview', component: WriteReviewsComponent },
      { path: 'checkIn', component: CheckInComponent },
      { path: 'checkIn', component: CheckInComponent },
      { path: 'BranchSelection', component: WalkInBranchComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(walkInPanelRoutes)],
  exports: [RouterModule]
})
export class WalkInPanelRoutingModule { }
