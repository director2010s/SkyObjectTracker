import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-terms-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  template: `
    <div [formGroupName]="'terms'" class="space-y-4">
      <div class="relative flex items-start">
        <div class="flex h-5 items-center">
          <input
            type="checkbox"
            formControlName="agreed"
            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
        <div class="ml-3 text-sm">
          <label class="font-medium text-gray-700">Terms and Conditions *</label>
          <p class="text-gray-500">
            I confirm that this report is accurate to the best of my knowledge and
            I agree to the <a href="#" class="text-blue-600 hover:underline">terms of service</a>
            and <a href="#" class="text-blue-600 hover:underline">privacy policy</a>.
          </p>
        </div>
      </div>

      <!-- reCAPTCHA -->
      <div class="g-recaptcha" data-sitekey="your-recaptcha-site-key"></div>
    </div>
  `
})
export class TermsFormComponent {
  constructor(public controlContainer: ControlContainer) {}
}