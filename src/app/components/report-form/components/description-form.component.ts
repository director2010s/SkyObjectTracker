import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-description-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  template: `
    <div class="space-y-4" formGroupName="description">
      <!-- Details -->
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Description Details *
        </label>
        <textarea
          formControlName="details"
          rows="4"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Provide a detailed description of what you observed"
        ></textarea>
      </div>

      <!-- Witnesses -->
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Witnesses (Optional)
        </label>
        <input
          type="text"
          formControlName="witnesses"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Names of other witnesses (if any)"
        />
      </div>
    </div>
  `
})
export class DescriptionFormComponent {}