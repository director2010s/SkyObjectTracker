import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { ReportDetailsComponent } from './components/report-details/report-details.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'tracking',
    component: DashboardComponent
  },
  {
    path: 'objects',
    component: DashboardComponent
  },
  {
    path: 'submit-report',
    component: ReportFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report/:id',
    component: ReportDetailsComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];