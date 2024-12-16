import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportActionsComponent } from './report-actions.component';
import { AdminViewModel } from '../admin.view-model';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';
import { ErrorMessageComponent } from '../../shared/error-message.component';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [
    CommonModule,
    ReportActionsComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  template: `
    <div class="bg-white shadow rounded-lg">
      <!-- Table Header -->
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Recent Reports
          </h3>
          <div class="flex space-x-3">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-gray-300 
                     rounded-md shadow-sm text-sm font-medium text-gray-700 
                     bg-white hover:bg-gray-50"
              (click)="viewModel.refreshReports()"
            >
              <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" 
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Table Content -->
      <div class="relative">
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr *ngFor="let report of viewModel.reports$ | async">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ report.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ report.type }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ report.coordinates.latitude }}°, {{ report.coordinates.longitude }}°
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ report.reportedAt | date:'medium' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                            [ngClass]="{
                              'bg-green-100 text-green-800': report.status === 'approved',
                              'bg-red-100 text-red-800': report.status === 'flagged',
                              'bg-yellow-100 text-yellow-800': report.status === 'pending'
                            }">
                        {{ report.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <app-report-actions
                        [report]="report"
                        (approve)="viewModel.approveReport($event)"
                        (flag)="viewModel.flagReport($event)"
                        (delete)="viewModel.deleteReport($event)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <app-loading-spinner *ngIf="viewModel.isLoading$ | async" />
        
        <app-error-message
          *ngIf="viewModel.error$ | async as error"
          [message]="error"
          (retry)="viewModel.refreshReports()"
        />
      </div>
    </div>
  `
})
export class ReportListComponent implements OnInit {
  constructor(public viewModel: AdminViewModel) {}

  ngOnInit() {
    this.viewModel.loadReports();
  }
}