import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './components/admin-header.component';
import { ReportListComponent } from './components/report-list.component';
import { AdminSidebarComponent } from './components/admin-sidebar.component';
import { AdminViewModel } from './admin.view-model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AdminHeaderComponent,
    ReportListComponent,
    AdminSidebarComponent
  ],
  providers: [AdminViewModel],
  template: `
    <div class="min-h-screen bg-gray-100">
      <app-admin-header />
      
      <div class="flex">
        <app-admin-sidebar />
        
        <main class="flex-1 p-6">
          <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl font-semibold text-gray-900 mb-6">
              Report Management
            </h1>

            <app-report-list />
          </div>
        </main>
      </div>
    </div>
  `
})
export class AdminDashboardComponent {}