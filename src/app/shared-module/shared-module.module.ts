import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SupportComponent } from './support/support.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceCategoryComponent } from './branchServices/service-category/service-category.component';
import { ManageClientComponent } from './clients/manage-client/manage-client.component';
import { ManageServiceComponent } from './branchServices/manage-service/manage-service.component';
import { ClientsComponent } from './clients/clients.component';
import { AppointmentDetailComponent } from './appointments/appointment-detail/appointment-detail.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { EditAppointmentComponent } from './appointments/edit-appointment/edit-appointment.component';
import { EmployeeComponent } from './employee/employee.component';
import { WeeklschduleComponent } from './weeklschdule/weeklschdule.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ChartistModule } from 'ng-chartist';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ServiceComponent } from './branchServices/service.component';
import { ManageEmployeeComponent } from './employee/manage-employee/manage-employee.component';
import { DailySaleComponent } from './daily-sale/daily-sale.component';
import { LoylityPointsComponent } from './loylity-points/loylity-points.component';
import { AppointmentStaticsComponent } from './appointment-statics/appointment-statics.component';
import { ProductsComponent } from './products/products.component';
import { ManageProductComponent } from './products/manage-product/manage-product.component';
import { ProductSaleComponent } from './product-sale/product-sale.component';
import { ProductCategoryComponent } from './products/product-category/product-category.component';
import { DefaultServicesComponent } from './branchServices/default-services/default-services.component';
import { ClientReviewsComponent } from './client-reviews/client-reviews.component';
import { ManageDocumentsComponent } from './manage-documents/manage-documents.component';
import { LeavesComponent } from './leaves/leaves.component';
import { ManageLeavesComponent } from './leaves/manage-leaves/manage-leaves.component';
import { UpcomingAppointmentsComponent } from './appointments/upcoming-appointments/upcoming-appointments.component';
import { InProgressAppointmentsComponent } from './appointments/in-progress-appointments/in-progress-appointments.component';
import { HistoricAppointmentsComponent } from './appointments/historic-appointments/historic-appointments.component';
import { ProductSaleHistoryComponent } from './product-sale/product-sale-history/product-sale-history.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductSelectorComponent } from './product-sale/product-selector/product-selector.component';
import { NewProductCategoryComponent } from './Common-Components/new-product-category/new-product-category.component';
import { AdminComponent } from './admins/admin.component';
import { ManageAdminComponent } from './admins/manage-admin/manage-admin.component';
import { NgxPrintModule } from 'ngx-print';
import { AttendanceComponent } from './attendance/attendance.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';



@NgModule({
  declarations: [
    DashboardComponent,

    AppointmentsComponent,
    AppointmentDetailComponent,
    EditAppointmentComponent,

    ServiceComponent,
    ServiceCategoryComponent,
    ManageServiceComponent,

    ClientsComponent,
    ManageClientComponent,

    EmployeeComponent,
    WeeklschduleComponent,
    SupportComponent,
    NavbarComponent,
    ManageEmployeeComponent,
    DailySaleComponent,
    LoylityPointsComponent,
    AppointmentStaticsComponent,
    ProductsComponent,
    ManageProductComponent,
    ProductSaleComponent,
    ProductCategoryComponent,
    DefaultServicesComponent,
    ClientReviewsComponent,
    ManageDocumentsComponent,
    LeavesComponent,
    ManageLeavesComponent,
    UpcomingAppointmentsComponent,
    InProgressAppointmentsComponent,
    HistoricAppointmentsComponent,
    ProductSaleHistoryComponent,
    PaymentComponent,
    ProductSelectorComponent,
    NewProductCategoryComponent,
    AdminComponent,
    ManageAdminComponent,
    AttendanceComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    UiSwitchModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ChartistModule,
    RouterModule,
    NgxPrintModule
  ],
  exports: [
    NavbarComponent,
    ManageDocumentsComponent
  ],
  providers: [DatePipe],
})
export class SharedModuleModule { }
