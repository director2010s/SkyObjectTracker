import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlContainer, FormGroupDirective } from '@angular/forms';
import { ObjectType } from '../../../models/sky-object.model';
import { FilterChange } from '../../filters/filter.types';
import { MapConfigService } from '../../../services/map-config.service';

@Component({
  selector: 'app-map-legend',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  template: `
    <div class="p-2">
      <div class="flex flex-wrap gap-x-4 gap-y-1">
        <label 
          *ngFor="let type of objectTypes"
          class="flex items-center space-x-1"
        >
          <input
            type="checkbox"
            [value]="type"
            [checked]="isSelected(type)"
            (change)="toggleType(type)"
            class="h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div 
            class="w-2 h-2 rounded-full"
            [style.backgroundColor]="getColor(type)"
          ></div>
          <span class="text-xs text-gray-600">{{ type }}</span>
        </label>
      </div>
    </div>
  `
})
export class MapLegendComponent {
  @Output() filterChange = new EventEmitter<FilterChange>();

  objectTypes: ObjectType[] = ['Drone', 'UFO', 'Light', 'Other'];
  selectedTypes: ObjectType[] = [...this.objectTypes];

  constructor(private mapConfig: MapConfigService) {
    this.emitFilterChange();
  }

  isSelected(type: ObjectType): boolean {
    return this.selectedTypes.includes(type);
  }

  toggleType(type: ObjectType) {
    const index = this.selectedTypes.indexOf(type);
    if (index === -1) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes.splice(index, 1);
    }
    this.emitFilterChange();
  }

  private emitFilterChange() {
    this.filterChange.emit({
      type: 'objectTypes',
      value: [...this.selectedTypes]
    });
  }

  getColor(type: ObjectType): string {
    return this.mapConfig.getMarkerColor(type);
  }
}