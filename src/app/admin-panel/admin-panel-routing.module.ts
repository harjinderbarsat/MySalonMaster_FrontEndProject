import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportComponent } from '../shared-module/support/support.component';
import { DashboardComponent } from '../shared-module/dashboard/dashboard.component';
import { EmployeeComponent } from '../shared-module/employee/employee.component';
import { AppointmentDetailComponent } from '../shared-module/appointments/appointment-detail/appointment-detail.component';

import { WeeklschduleComponent } from '../shared-module/weeklschdule/weeklschdule.component';
import { ClientsComponent } from '../shared-module/clients/clients.component';
import { ServiceCategoryComponent } from '../shared-module/branchServices/service-category/service-category.component';
import { ServiceComponent } from '../shared-module/branchServices/service.component';
import { EditAppointmentComponent } from '../shared-module/appointments/edit-appointment/edit-appointment.component';
import { ManageEmployeeComponent } from '../shared-module/employee/manage-employee/manage-employee.component';

import { ManageBranchComponent } from './branchs/manage-branch/manage-branch.component';
import { BranchsComponent } from './branchs/branchs.component';
import { AdminPanelComponent } from './admin-panel.component';
import { ManageServiceComponent } from '../shared-module/branchServices/manage-service/manage-service.component';
import { ManageClientComponent } from '../shared-module/clients/manage-client/manage-client.component';
import { DailySaleComponent } from '../shared-module/daily-sale/daily-sale.component';
import { LoylityPointsComponent } from '../shared-module/loylity-points/loylity-points.component';
import { AppointmentStaticsComponent } from '../shared-module/appointment-statics/appointment-statics.component';
import { ProductsComponent } from '../shared-module/products/products.component';
import { ManageProductComponent } from '../shared-module/products/manage-product/manage-product.component';
import { ProductSaleComponent } from '../shared-module/product-sale/product-sale.component';
import { ProductCategoryComponent } from '../shared-module/products/product-category/product-category.component';
import { DefaultServicesComponent } from '../shared-module/branchServices/default-services/default-services.component';
import { ClientReviewsComponent } from '../shared-module/client-reviews/client-reviews.component';
import { LeavesComponent } from '../shared-module/leaves/leaves.component';
import { ManageLeavesComponent } from '../shared-module/leaves/manage-leaves/manage-leaves.component';
import { UpcomingAppointmentsComponent } from '../shared-module/appointments/upcoming-appointments/upcoming-appointments.component';
import { InProgressAppointmentsComponent } from '../shared-module/appointments/in-progress-appointments/in-progress-appointments.component';
import { HistoricAppointmentsComponent } from '../shared-module/appointments/historic-appointments/historic-appointments.component';
import { ProductSaleHistoryComponent } from '../shared-module/product-sale/product-sale-history/product-sale-history.component';
import { PaymentComponent } from '../shared-module/payment/payment.component';
import { ProductSelectorComponent } from '../shared-module/product-sale/product-selector/product-selector.component';
import {SettingsComponent} from './settings/settings.component'
import { AttendanceComponent } from '../shared-module/attendance/attendance.component';

export const AdminManagerRoutes: Routes = [
  {
    path: '', component: AdminPanelComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'weekly-schedule', component: WeeklschduleComponent },
      { path: 'attendance', component: AttendanceComponent },

      { path: 'upcoming-appointments', component: UpcomingAppointmentsComponent },
      { path: 'in-progress-appointments', component: InProgressAppointmentsComponent },
      { path: 'historic-appointments', component: HistoricAppointmentsComponent },
      { path: 'appointment-detail/:id', component: AppointmentDetailComponent },
      { path: 'appointment-manage/:id', component: EditAppointmentComponent },
      { path: 'payment/:id/:type', component: PaymentComponent },

      { path: 'daily-sale', component: DailySaleComponent },
      { path: 'appointments-static', component: AppointmentStaticsComponent },
      { path: 'loylity-points', component: LoylityPointsComponent },

      { path: 'customer', component: ClientsComponent },
      { path: 'manage-clients/:id', component: ManageClientComponent },
      { path: 'client-Reviews', component: ClientReviewsComponent },

      { path: 'product-sale', component: ProductSaleComponent },
      { path: 'product-select/:id', component: ProductSelectorComponent },
      { path: 'product-sale-history', component: ProductSaleHistoryComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'manage-products/:id', component: ManageProductComponent },
      { path: 'products-Categoty', component: ProductCategoryComponent },


      { path: 'serviceList', component: ServiceComponent },
      { path: 'manage-service/:id', component: ManageServiceComponent },
      { path: 'serviceCategory', component: ServiceCategoryComponent },
      { path: 'defaultServices', component: DefaultServicesComponent },

      // Admin
      { path: 'storeList', component: BranchsComponent },
      { path: 'manage-store/:id', component: ManageBranchComponent },
      { path: 'employees', component: EmployeeComponent },
      { path: 'manage-employee/:id', component: ManageEmployeeComponent },
      { path: 'leaves', component: LeavesComponent },
      { path: 'manage-leaves/:id', component: ManageLeavesComponent },
      
      { path: 'support', component: SupportComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(AdminManagerRoutes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
