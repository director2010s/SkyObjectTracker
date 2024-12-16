import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SkyObject } from '../../models/sky-object.model';
import { SkyObjectService } from '../../services/sky-object.service';

interface ReportDetailsState {
  report: SkyObject | null;
  images: Array<{ url: string; caption?: string }>;
  videos: Array<{ url: string; caption?: string }>;
  isLoading: boolean;
  error: string | null;
}

@Injectable()
export class ReportDetailsViewModel {
  state: ReportDetailsState = {
    report: null,
    images: [],
    videos: [],
    isLoading: true,
    error: null
  };

  constructor(
    private skyObjectService: SkyObjectService,
    private router: Router
  ) {}

  initialize() {
    this.loadReport();
  }

  loadReport() {
    this.state.isLoading = true;
    this.state.error = null;

    // TODO: Get report ID from route params
    const reportId = '1'; // Temporary hardcoded ID

    this.skyObjectService.getObjectById(reportId).subscribe({
      next: (report) => {
        if (report) {
          this.state.report = report;
          // TODO: Load media files when implemented
          this.state.images = [];
          this.state.videos = [];
        } else {
          this.state.error = 'Report not found';
        }
        this.state.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading report:', error);
        this.state.error = 'Failed to load report. Please try again.';
        this.state.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  get hasMedia(): boolean {
    return this.state.images.length > 0 || this.state.videos.length > 0;
  }
}