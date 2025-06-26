import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { LeavesComponent } from './leaves/leaves.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationComponent } from './notification/notification.component';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: SidenavComponent,
    children: [
      // { path: 'employee', component: EmployeeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'employee-dashboard', component: EmployeedashboardComponent },
      { path: 'leaves', component: LeavesComponent },
      { path: 'settings', component: SettingsComponent }, 
    ],
  },
  { path: 'login', component: LoginComponent },
];
