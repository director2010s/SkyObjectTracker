import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportHeaderComponent } from './components/report-header.component';
import { ReportLocationComponent } from './components/report-location.component';
import { ReportDetailsInfoComponent } from './components/report-details-info.component';
import { ReportMediaGalleryComponent } from './components/report-media-gallery.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message.component';
import { SkyObject } from '../../models/sky-object.model';
import { ReportDetailsViewModel } from './report-details.view-model';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [
    CommonModule,
    ReportHeaderComponent,
    ReportLocationComponent,
    ReportDetailsInfoComponent,
    ReportMediaGalleryComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  providers: [ReportDetailsViewModel],
  template: `
    <div class="max-w-4xl mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <ng-container *ngIf="!viewModel.state.isLoading && !viewModel.state.error">
          <!-- Report Header -->
          <app-report-header
            [object]="viewModel.state.report!"
            (back)="viewModel.goBack()"
          />

          <div class="p-6 space-y-8">
            <!-- Location Information -->
            <app-report-location
              [coordinates]="viewModel.state.report!.coordinates"
            />

            <!-- Report Details -->
            <app-report-details-info
              [object]="viewModel.state.report!"
            />

            <!-- Media Gallery -->
            <app-report-media-gallery
              *ngIf="viewModel.hasMedia"
              [images]="viewModel.state.images"
              [videos]="viewModel.state.videos"
            />
          </div>
        </ng-container>

        <!-- Loading State -->
        <app-loading-spinner *ngIf="viewModel.state.isLoading" />

        <!-- Error State -->
        <app-error-message
          *ngIf="viewModel.state.error"
          [message]="viewModel.state.error"
          (retry)="viewModel.loadReport()"
        />
      </div>
    </div>
  `
})
export class ReportDetailsComponent implements OnInit {
  constructor(public viewModel: ReportDetailsViewModel) {}

  ngOnInit() {
    this.viewModel.initialize();
  }
}