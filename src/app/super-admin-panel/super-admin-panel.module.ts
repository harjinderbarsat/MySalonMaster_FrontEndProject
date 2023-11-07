import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SuperAdminManagerRoutes, SuperAdminPanelRoutingModule } from './super-admin-panel-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizeRouterModule } from 'localize-router';
import { UiSwitchModule } from 'ngx-ui-switch';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartistModule } from 'ng-chartist';
import { SuperAdminPanelComponent } from './super-admin-panel.component';
import { SuperAdminSidebarComponent } from './sidebar/sidebar.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [
    SuperAdminPanelComponent,
    SuperAdminSidebarComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    SuperAdminPanelRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    UiSwitchModule,
    ChartistModule,
    SharedModuleModule
  ],
  providers: [DatePipe]
})
export class SuperAdminPanelModule { }
