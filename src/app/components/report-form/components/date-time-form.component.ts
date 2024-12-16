import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-date-time-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  template: `
    <div class="space-y-4" formGroupName="dateTime">
      <!-- Date Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Date *
        </label>
        <input
          type="date"
          formControlName="date"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <!-- Time Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Time *
        </label>
        <input
          type="time"
          formControlName="time"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  `
})
export class DateTimeFormComponent {
  constructor(public controlContainer: ControlContainer) {}
}