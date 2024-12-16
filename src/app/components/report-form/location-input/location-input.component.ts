import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-location-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [formGroupName]="'location'" class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900">Location Details</h3>
      
      <!-- Street Address -->
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Street Address *
        </label>
        <input
          type="text"
          formControlName="street"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter street address"
        />
      </div>

      <!-- City -->
      <div>
        <label class="block text-sm font-medium text-gray-700">
          City *
        </label>
        <input
          type="text"
          formControlName="city"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter city"
        />
      </div>

      <!-- State/Region -->
      <div>
        <label class="block text-sm font-medium text-gray-700">
          State/Region *
        </label>
        <input
          type="text"
          formControlName="region"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter state or region"
        />
      </div>

      <!-- Country -->
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Country *
        </label>
        <input
          type="text"
          formControlName="country"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter country"
        />
      </div>
    </div>
  `
})
export class LocationInputComponent {
  constructor(public controlContainer: ControlContainer) {}
}