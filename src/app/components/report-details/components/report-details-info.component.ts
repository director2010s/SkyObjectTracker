import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyObject } from '../../../models/sky-object.model';

@Component({
  selector: 'app-report-details-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Details</h2>
      
      <div class="bg-gray-50 rounded-lg p-4">
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Object Type</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ object.type }}</dd>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-500">Report Date</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ object.reportedAt | date:'medium' }}
            </dd>
          </div>
        </dl>

        <div class="mt-6">
          <h3 class="text-sm font-medium text-gray-500">Description</h3>
          <p class="mt-2 text-sm text-gray-900 whitespace-pre-line">
            {{ object.description }}
          </p>
        </div>
      </div>
    </section>
  `
})
export class ReportDetailsInfoComponent {
  @Input({ required: true }) object!: SkyObject;
}