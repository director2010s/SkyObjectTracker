import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Location</h2>
      
      <div class="bg-gray-50 rounded-lg p-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3 class="text-sm font-medium text-gray-500">Coordinates</h3>
            <p class="mt-1 text-sm text-gray-900">
              {{ coordinates.latitude }}°, {{ coordinates.longitude }}°
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ReportLocationComponent {
  @Input({ required: true }) coordinates!: { latitude: number; longitude: number };
}