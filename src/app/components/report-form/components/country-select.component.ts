import { Component, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { COUNTRIES } from '../../../utils/constants/countries';

@Component({
  selector: 'app-country-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="space-y-2">
      <select
        [value]="value"
        (change)="onSelectChange($event)"
        (blur)="onTouch()"
        [disabled]="disabled"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
               focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select a country</option>
        <option *ngFor="let country of countries" [value]="country.code">
          {{ country.name }}
        </option>
      </select>
    </div>
  `
})
export class CountrySelectComponent implements ControlValueAccessor, OnInit {
  countries = COUNTRIES;
  value = '';
  disabled = false;
  onChange: any = () => {};
  onTouch: any = () => {};

  ngOnInit() {
    console.log('Countries loaded:', this.countries);
  }

  onSelectChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouch();
  }

  writeValue(value: string): void {
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