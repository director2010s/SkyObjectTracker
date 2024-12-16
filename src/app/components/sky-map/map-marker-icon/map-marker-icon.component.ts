import { Component, Input } from '@angular/core';
import { ObjectType } from '../../../models/sky-object.model';
import { MapConfigService } from '../../../services/map-config.service';

@Component({
  selector: 'app-map-marker-icon',
  standalone: true,
  template: `
    <div
      class="marker-icon"
      [style.background-color]="markerColor"
    ></div>
  `,
  styles: [`
    .marker-icon {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 4px rgba(0,0,0,0.4);
    }
  `]
})
export class MapMarkerIconComponent {
  @Input() type!: ObjectType;

  constructor(private mapConfig: MapConfigService) {}

  get markerColor(): string {
    return this.mapConfig.getMarkerColor(this.type);
  }
}