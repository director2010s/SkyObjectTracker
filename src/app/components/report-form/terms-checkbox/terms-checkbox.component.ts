import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-terms-checkbox',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TermsCheckboxComponent),
      multi: true
    }
  ],
  template: `
    <div class="space-y-2">
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input
            type="checkbox"
            [checked]="value"
            (change)="onCheckboxChange($event)"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
    </div>
  `
})
export class TermsCheckboxComponent implements ControlValueAccessor {
  value = false;
  onChange: any = () => {};
  onTouch: any = () => {};

  onCheckboxChange(event: any) {
    this.value = event.target.checked;
    this.onChange(this.value);
    this.onTouch();
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}