import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-name-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  template: `
    <div>
      <label class="block text-sm font-medium text-gray-700">
        Report Name *
      </label>
      <input
        type="text"
        formControlName="name"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
               focus:border-blue-500 focus:ring-blue-500"
        placeholder="Enter a name for your report"
      />
      <p class="mt-1 text-sm text-gray-500">
        Give your report a descriptive name
      </p>
    </div>
  `
})
export class NameFormComponent {}
