import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ObjectType } from '../../models/sky-object.model';
import { FilterChange } from './filter.types';

@Component({
  selector: 'app-object-type-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-2">
      <div class="flex flex-wrap gap-x-4 gap-y-1">
        <label 
          *ngFor="let type of objectTypes"
          class="flex items-center space-x-1 cursor-pointer"
        >
          <input
            type="checkbox"
            [value]="type"
            [checked]="selectedTypes.includes(type)"
            (change)="toggleType(type)"
            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div 
            class="w-2 h-2 rounded-full"
            [ngClass]="{
              'bg-green-500': type === 'Drone',
              'bg-blue-500': type === 'UFO',
              'bg-yellow-400': type === 'Light',
              'bg-gray-500': type === 'Other'
            }"
          ></div>
          <span class="text-sm text-gray-700">{{ type }}</span>
        </label>
      </div>
    </div>
  `
})
export class ObjectTypeFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<FilterChange>();

  objectTypes: ObjectType[] = ['Drone', 'UFO', 'Light', 'Other'];
  selectedTypes: ObjectType[] = [];

  ngOnInit() {
    // Set all types as selected by default
    this.selectedTypes = [...this.objectTypes];
    
    // Emit initial filter state
    this.emitChange();
  }

  toggleType(type: ObjectType) {
    const index = this.selectedTypes.indexOf(type);
    if (index === -1) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes.splice(index, 1);
    }
    this.emitChange();
  }

  private emitChange() {
    this.filterChange.emit({
      type: 'objectTypes',
      value: this.selectedTypes
    });
  }
}