import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from '../shared-module/attendance/attendance.component';
import { LeavesComponent } from '../shared-module/leaves/leaves.component';
import { ManageLeavesComponent } from '../shared-module/leaves/manage-leaves/manage-leaves.component';
import { DocuemntsComponent } from './docuemnts/docuemnts.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeePanelComponent } from './employee-panel.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { IncentiveComponent } from './incentive/incentive.component';
import { WorkschduleComponent } from './workschdule/workschdule.component';

export const emplyeePanelRoutes: Routes = [
  {
    path: '', component: EmployeePanelComponent,
    children: [
      { path: 'attendance', component: AttendanceComponent },
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'profile', component: EmployeeProfileComponent },
      { path: 'leaves', component: LeavesComponent },
      { path: 'manage-leaves/:id', component: ManageLeavesComponent },
      { path: 'incentive', component: IncentiveComponent },
      { path: 'weekly-schedule', component: WorkschduleComponent },
      { path: 'docuemnts', component: DocuemntsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(emplyeePanelRoutes)],
  exports: [RouterModule]
})
export class EmployeePanelRoutingModule { }
