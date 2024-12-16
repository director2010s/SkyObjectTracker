import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ObjectType } from '../../../models/sky-object.model';

@Component({
  selector: 'app-object-type-select',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ObjectTypeSelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">
        Object Type *
      </label>
      <select
        [value]="value"
        (change)="onChange($event)"
        (blur)="onTouch()"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
               focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select an object type</option>
        <option *ngFor="let type of objectTypes" [value]="type">
          {{ type }}
        </option>
      </select>
    </div>
  `
})
export class ObjectTypeSelectComponent implements ControlValueAccessor {
  objectTypes: ObjectType[] = ['Drone', 'UFO', 'Light', 'Other'];
  value: ObjectType | '' = '';
  disabled = false;
  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: ObjectType): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}