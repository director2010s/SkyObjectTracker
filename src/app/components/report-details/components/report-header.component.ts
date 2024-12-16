import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyObject } from '../../../models/sky-object.model';
import { ObjectTypeIconComponent } from '../../object-list/object-list-item/object-type-icon.component';

@Component({
  selector: 'app-report-header',
  standalone: true,
  imports: [CommonModule, ObjectTypeIconComponent],
  template: `
    <div class="bg-gray-50 border-b">
      <div class="px-6 py-4">
        <div class="flex items-center space-x-4">
          <button
            (click)="back.emit()"
            class="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <div class="flex items-center space-x-3">
            <app-object-type-icon [type]="object.type" />
            <h1 class="text-2xl font-bold text-gray-900">{{ object.name }}</h1>
          </div>
        </div>

        <div class="mt-2 flex items-center text-sm text-gray-500">
          <span>Reported by {{ object.reportedBy }}</span>
          <span class="mx-2">•</span>
          <span>{{ object.reportedAt | date:'medium' }}</span>
        </div>
      </div>
    </div>
  `
})
export class ReportHeaderComponent {
  @Input({ required: true }) object!: SkyObject;
  @Output() back = new EventEmitter<void>();
}