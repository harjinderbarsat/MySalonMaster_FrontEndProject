import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EmployeePanelRoutingModule, emplyeePanelRoutes } from './employee-panel-routing.module';
import { EmployeePanelComponent } from './employee-panel.component';
import { ChartistModule } from 'ng-chartist';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LocalizeRouterModule } from 'localize-router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { IncentiveComponent } from './incentive/incentive.component';
import { WorkschduleComponent } from './workschdule/workschdule.component';
import { DocuemntsComponent } from './docuemnts/docuemnts.component';
import { EmployeeSidebarComponent } from './employee-sidebar/employee-sidebar.component';
import { EmployeeNavbarComponent } from './employee-navbar/employee-navbar.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [EmployeePanelComponent,
    EmployeeDashboardComponent,
    EmployeeProfileComponent, 
    IncentiveComponent,
    WorkschduleComponent, 
    DocuemntsComponent,
    EmployeeSidebarComponent, 
    EmployeeNavbarComponent],
  imports: [
    CommonModule,
    EmployeePanelRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    UiSwitchModule,
    ChartistModule,
    SharedModuleModule
  ],
  providers: [DatePipe]
})
export class EmployeePanelModule { }
