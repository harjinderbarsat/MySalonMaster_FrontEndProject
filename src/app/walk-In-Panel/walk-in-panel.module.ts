import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { walkInPanelRoutes, WalkInPanelRoutingModule } from './walk-in-panel-routing.module';
import { WalkInSelectServiceComponent } from './walk-in-select-service/walk-in-select-service.component';
import { WalkInPaymentComponent } from './walk-in-payment/walk-in-payment.component';
import { WalkInPanelRegistrationComponent } from './walk-in-panel-registration/walk-in-panel-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';
import { WalkInPanelComponent } from './walk-in-panel.component';
import { WalkInAppointmentTimeComponent } from './walk-in-appointment-time/walk-in-appointment-time.component';
import { BookAnAppointmentComponent } from './book-an-appointment/book-an-appointment.component';
import { FinalConfirmationComponent } from './final-confirmation/final-confirmation.component';
import { WriteReviewsComponent } from './write-reviews/write-reviews.component';
import { CheckInComponent } from './check-in/check-in.component';
import { CartComponent } from './cart/cart.component';
import { WalkInBranchComponent } from './walk-in-branch/walk-in-branch.component';

@NgModule({
  declarations: [
    WalkInPanelComponent ,
    WalkInSelectServiceComponent,
    WalkInPaymentComponent,
    WalkInPanelRegistrationComponent,
    WalkInAppointmentTimeComponent,
    BookAnAppointmentComponent,
    FinalConfirmationComponent,
    WriteReviewsComponent,
    CheckInComponent,
    CartComponent,
    WalkInBranchComponent
  ],
  imports: [
    CommonModule,
    WalkInPanelRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule.forChild() 
  ],
  providers:[DatePipe],
  bootstrap: [WalkInPanelComponent],
})
export class WalkInPanelModule { }
