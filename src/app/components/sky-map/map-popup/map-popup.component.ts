import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SkyObject } from '../../../models/sky-object.model';

@Component({
  selector: 'app-map-popup',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="marker-popup">
      <h3 class="text-lg font-semibold">{{ object.name }}</h3>
      <p class="text-sm text-gray-600">Type: {{ object.type }}</p>
      <p *ngIf="object.description" class="text-sm">{{ object.description }}</p>
      <div class="text-xs text-gray-500 mt-2">
        <p>Reported by: {{ object.reportedBy }}</p>
        <p>Date: {{ object.reportedAt | date:'medium' }}</p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: relative;
      z-index: 1000 !important;
    }

    .marker-popup {
      min-width: 200px;
      padding: 0.5rem;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 1000;
    }

    :host ::ng-deep {
      .leaflet-popup {
        z-index: 1000;
        position: relative;
      }

      .leaflet-popup-content-wrapper {
        z-index: 1000;
        position: relative;
      }

      .leaflet-popup-content {
        margin: 0;
        z-index: 1000;
      }

      .leaflet-container {
        z-index: 0;
      }

      .leaflet-popup-close-button {
        z-index: 1001;
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  `]
})
export class MapPopupComponent {
  @Input() object!: SkyObject;
}