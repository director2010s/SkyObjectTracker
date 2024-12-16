import { Routes } from '@angular/router';
import { ReportDetailsComponent } from './report-details.component';

export const REPORT_DETAILS_ROUTES: Routes = [
  {
    path: ':id',
    component: ReportDetailsComponent
  }
];