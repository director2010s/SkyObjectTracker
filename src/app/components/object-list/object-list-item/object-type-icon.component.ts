import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectType } from '../../../models/sky-object.model';
import { MapConfigService } from '../../../services/map-config.service';

@Component({
  selector: 'app-object-type-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="w-8 h-8 rounded-full flex items-center justify-center"
      [style.backgroundColor]="getBackgroundColor()"
      [style.color]="'white'"
    >
      <span class="text-xs">{{ getIconText() }}</span>
    </div>
  `
})
export class ObjectTypeIconComponent {
  @Input({ required: true }) type!: ObjectType;

  constructor(private mapConfig: MapConfigService) {}

  getBackgroundColor(): string {
    return this.mapConfig.getMarkerColor(this.type);
  }

  getIconText(): string {
    return this.type.charAt(0);
  }
}