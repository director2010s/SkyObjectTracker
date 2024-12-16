import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SkyObject } from '../../../models/sky-object.model';
import { MapConfigService } from '../../../services/map-config.service';

@Component({
  selector: 'app-map-marker',
  standalone: true,
  imports: [CommonModule, DatePipe],
  providers: [DatePipe],
  template: `
    <div class="marker-popup">
      <h3 class="text-lg font-semibold">{{ object.name }}</h3>
      <p class="text-sm text-gray-600">Type: {{ object.type }}</p>
      <p class="text-sm">{{ object.description }}</p>
      <div class="text-xs text-gray-500 mt-2">
        <p>Reported by: {{ object.reportedBy }}</p>
        <p>Date: {{ object.reportedAt | date:'medium' }}</p>
      </div>
    </div>
  `,
  styles: [`
    .marker-popup {
      min-width: 200px;
      padding: 0.5rem;
    }
  `]
})
export class MapMarkerComponent {
  @Input() object!: SkyObject;

  constructor(private mapConfig: MapConfigService) {}

  getMarkerColor(): string {
    return this.mapConfig.getMarkerColor(this.object.type);
  }
}