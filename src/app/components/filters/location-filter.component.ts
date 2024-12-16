import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { FilterChange } from './filter.types';
import { CountrySelectComponent } from '../report-form/components/country-select.component';
import { STATES_BY_COUNTRY, State } from '../../utils/constants/states';

@Component({
  selector: 'app-location-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CountrySelectComponent],
  template: `
    <div [formGroup]="form" class="p-2 space-y-2">
      <div class="flex gap-2">
        <div class="w-[140px]">
          <app-country-select formControlName="country" (change)="onCountryChange()" />
        </div>
        
        <div class="w-[140px]">
          <select
            *ngIf="availableStates.length > 0; else regionInput"
            formControlName="region"
            (change)="onFormChange()"
            class="block w-full h-7 px-2 rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500 text-xs"
          >
            <option value="">Select State</option>
            <option *ngFor="let state of availableStates" [value]="state.code">
              {{ state.name }}
            </option>
          </select>
          <ng-template #regionInput>
            <input
              type="text"
              formControlName="region"
              class="block w-full h-7 px-2 rounded-md border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500 text-xs"
              placeholder="State/Region"
              (change)="onFormChange()"
            />
          </ng-template>
        </div>
        
        <div class="w-[140px]">
          <input
            type="text"
            formControlName="city"
            class="block w-full h-7 px-2 rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500 text-xs"
            placeholder="City"
            (change)="onFormChange()"
          />
        </div>
      </div>
      
      <div class="w-full">
        <input
          type="text"
          formControlName="address"
          class="block w-full h-7 px-2 rounded-md border-gray-300 shadow-sm 
                 focus:border-blue-500 focus:ring-blue-500 text-xs"
          placeholder="Street address"
          (change)="onFormChange()"
        />
      </div>
    </div>
  `
})
export class LocationFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<FilterChange>();

  form: FormGroup;
  availableStates: State[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      country: [''],
      region: [''],
      city: [''],
      address: ['']
    });
  }

  ngOnInit() {
    // Emit initial values
    this.emitFilterChange();

    // Subscribe to form changes
    this.form.valueChanges.subscribe(() => {
      this.emitFilterChange();
    });
  }

  onCountryChange() {
    const countryCode = this.form.get('country')?.value;
    this.availableStates = countryCode ? (STATES_BY_COUNTRY[countryCode] || []) : [];
    
    // Reset region if country changes
    if (this.form.get('region')?.value) {
      this.form.patchValue({ region: '' });
    }
    
    this.onFormChange();
  }

  onFormChange() {
    this.emitFilterChange();
  }

  private emitFilterChange() {
    const formValue = this.form.value;
    this.filterChange.emit({
      type: 'location',
      value: {
        country: formValue.country || '',
        region: formValue.region || '',
        city: formValue.city || '',
        address: formValue.address || ''
      }
    });
  }
}