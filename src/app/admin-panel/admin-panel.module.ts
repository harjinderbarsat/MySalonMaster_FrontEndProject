import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminManagerRoutes, AdminPanelRoutingModule } from './admin-panel-routing.module';
import { SaleDetailsComponent } from '../admin-panel/sale-details/sale-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizeRouterModule } from 'localize-router';
import { UiSwitchModule } from 'ngx-ui-switch';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartistModule } from 'ng-chartist';
import { AdminPanelComponent } from './admin-panel.component';
 
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { BranchsComponent } from './branchs/branchs.component';
import { ManageBranchComponent } from './branchs/manage-branch/manage-branch.component';
import { sidebarComponent } from './sidebar/sidebar.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    AdminPanelComponent,
    SaleDetailsComponent,
    BranchsComponent,
    ManageBranchComponent,
    sidebarComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
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
export class AdminPanelModule { }
