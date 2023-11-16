import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchPanelRoutingModule } from './branch-panel-routing.module';
import { BranchPanelComponent } from './branch-panel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ChartistModule } from 'ng-chartist';
import { BranchProfileComponent } from './branch-profile/branch-profile.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [
    BranchPanelComponent,
    BranchProfileComponent
  ],
  imports: [
    CommonModule,
    BranchPanelRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    UiSwitchModule,
    ChartistModule,
    SharedModuleModule
  ]
})
export class BranchPanelModule { }