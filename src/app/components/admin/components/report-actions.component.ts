import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyObject } from '../../../models/sky-object.model';

@Component({
  selector: 'app-report-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex space-x-2">
      <button
        (click)="approve.emit(report)"
        class="text-green-600 hover:text-green-900"
        title="Approve Report"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M5 13l4 4L19 7" />
        </svg>
      </button>

      <button
        (click)="flag.emit(report)"
        class="text-yellow-600 hover:text-yellow-900"
        title="Flag Report"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      </button>

      <button
        (click)="confirmDelete()"
        class="text-red-600 hover:text-red-900"
        title="Delete Report"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  `
})
export class ReportActionsComponent {
  @Input() report!: SkyObject;
  @Output() approve = new EventEmitter<SkyObject>();
  @Output() flag = new EventEmitter<SkyObject>();
  @Output() delete = new EventEmitter<SkyObject>();

  confirmDelete() {
    if (confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      this.delete.emit(this.report);
    }
  }
}