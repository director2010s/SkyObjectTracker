import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroupDirective, ControlContainer } from '@angular/forms';
import { OBJECT_TYPES } from '../../../utils/constants/object-types';

@Component({
  selector: 'app-object-type-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  template: `
    <div class="space-y-4" formGroupName="objectType">
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Object Type *
        </label>
        <select
          formControlName="type"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select an object type</option>
          <option *ngFor="let obj of objectTypes" [value]="obj.type">
            {{ obj.type }}
          </option>
        </select>
        <p class="mt-1 text-sm text-gray-500">
          {{ getSelectedTypeDescription() }}
        </p>
      </div>
    </div>
  `
})
export class ObjectTypeFormComponent {
  objectTypes = OBJECT_TYPES;
  
  constructor(public controlContainer: ControlContainer) {}

  getSelectedTypeDescription(): string {
    const form = this.controlContainer.control;
    if (!form) return '';
    
    const selectedType = form.get('objectType.type')?.value;
    const typeInfo = this.objectTypes.find(t => t.type === selectedType);
    return typeInfo?.description || 'Choose the category that best describes what you observed';
  }
}