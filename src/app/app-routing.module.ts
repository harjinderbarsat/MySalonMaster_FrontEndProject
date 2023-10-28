import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const mainRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./front-end/front-end.module').then(m => m.FrontEndModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee-panel/employee-panel.module').then(m => m.EmployeePanelModule)
  },
  {
    path: 'branch',
    loadChildren: () => import('./branch-panel/branch-panel.module').then(m => m.BranchPanelModule)
  },
  {
    path: 'walkIn',
    loadChildren: () => import('./walk-In-Panel/walk-in-panel.module').then(m => m.WalkInPanelModule)
  },
  {
    path: 'super-admin',
    loadChildren: () => import('./super-admin-panel/super-admin-panel.module').then(m => m.SuperAdminPanelModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(mainRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
