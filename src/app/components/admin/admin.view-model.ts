import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SkyObject } from '../../models/sky-object.model';
import { SkyObjectService } from '../../services/sky-object.service';
import { AdminService } from '../../services/admin.service';

@Injectable()
export class AdminViewModel {
  private reportsSubject = new BehaviorSubject<SkyObject[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  reports$ = this.reportsSubject.asObservable();
  isLoading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(
    private skyObjectService: SkyObjectService,
    private adminService: AdminService
  ) {}

  loadReports() {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.skyObjectService.getObjects().subscribe({
      next: (reports) => {
        this.reportsSubject.next(reports);
        this.loadingSubject.next(false);
      },
      error: (error) => {
        console.error('Error loading reports:', error);
        this.errorSubject.next('Failed to load reports. Please try again.');
        this.loadingSubject.next(false);
      }
    });
  }

  refreshReports() {
    this.loadReports();
  }

  approveReport(report: SkyObject) {
    this.adminService.approveReport(report.id).subscribe({
      next: () => this.refreshReports(),
      error: (error) => {
        console.error('Error approving report:', error);
        this.errorSubject.next('Failed to approve report. Please try again.');
      }
    });
  }

  flagReport(report: SkyObject) {
    this.adminService.flagReport(report.id).subscribe({
      next: () => this.refreshReports(),
      error: (error) => {
        console.error('Error flagging report:', error);
        this.errorSubject.next('Failed to flag report. Please try again.');
      }
    });
  }

  deleteReport(report: SkyObject) {
    this.adminService.deleteReport(report.id).subscribe({
      next: () => this.refreshReports(),
      error: (error) => {
        console.error('Error deleting report:', error);
        this.errorSubject.next('Failed to delete report. Please try again.');
      }
    });
  }
}