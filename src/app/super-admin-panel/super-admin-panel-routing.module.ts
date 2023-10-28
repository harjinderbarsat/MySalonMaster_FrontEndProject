import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../shared-module/admins/admin.component';
import { SuperAdminPanelComponent } from '../super-admin-panel/super-admin-panel.component';
import { ManageAdminComponent } from '../shared-module/admins/manage-admin/manage-admin.component';

export const SuperAdminManagerRoutes: Routes = [
  {
    path: '', component: SuperAdminPanelComponent,
    children: [
      { path: 'dashboard', component: AdminComponent },
      { path: 'admins', component: AdminComponent },
      { path: 'manage-admin/:id', component: ManageAdminComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(SuperAdminManagerRoutes)],
  exports: [RouterModule]
})
export class SuperAdminPanelRoutingModule { }
