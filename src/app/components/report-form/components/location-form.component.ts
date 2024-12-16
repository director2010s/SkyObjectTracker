import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ControlContainer, FormGroupDirective, FormGroup } from '@angular/forms';
import { CountrySelectComponent } from './country-select.component';
import { STATES_BY_COUNTRY, State } from '../../../utils/constants/states';
import { CITIES, City } from '../../../utils/constants/cities';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CountrySelectComponent],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  template: `
    <div class="space-y-4" formGroupName="location">
      <!-- Coordinates Section -->
      <div class="flex flex-col space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Coordinates</h3>
          <button
            type="button"
            (click)="detectLocation()"
            class="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Detect My Location
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <!-- Latitude -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Latitude *
            </label>
            <input
              type="number"
              step="any"
              formControlName="latitude"
              [class]="'mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ' + 
                      (isFieldInvalid('latitude') ? 
                        'border-red-500 focus:border-red-500' : 
                        'border-gray-300 focus:border-blue-500')"
              placeholder="Enter latitude"
            />
            <div *ngIf="isFieldInvalid('latitude')" class="mt-1 text-sm text-red-600">
              This field is required
            </div>
          </div>

          <!-- Longitude -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Longitude *
            </label>
            <input
              type="number"
              step="any"
              formControlName="longitude"
              [class]="'mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ' + 
                      (isFieldInvalid('longitude') ? 
                        'border-red-500 focus:border-red-500' : 
                        'border-gray-300 focus:border-blue-500')"
              placeholder="Enter longitude"
            />
            <div *ngIf="isFieldInvalid('longitude')" class="mt-1 text-sm text-red-600">
              This field is required
            </div>
          </div>
        </div>
      </div>

      <!-- Address Section -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Address</h3>
        
        <!-- Street -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Street Address *
          </label>
          <input
            type="text"
            formControlName="street"
            [class]="'mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ' + 
                    (isFieldInvalid('street') ? 
                      'border-red-500 focus:border-red-500' : 
                      'border-gray-300 focus:border-blue-500')"
            placeholder="Enter street address"
          />
          <div *ngIf="isFieldInvalid('street')" class="mt-1 text-sm text-red-600">
            This field is required
          </div>
        </div>

        <!-- Country -->
        <app-country-select 
          formControlName="country"
          (change)="onCountryChange()"
        />

        <!-- State/Region -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            State/Region *
          </label>
          <select
            *ngIf="availableStates.length > 0; else regionInput"
            formControlName="region"
            [class]="'mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ' + 
                    (isFieldInvalid('region') ? 
                      'border-red-500 focus:border-red-500' : 
                      'border-gray-300 focus:border-blue-500')"
            (change)="onStateChange()"
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
              [class]="'mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ' + 
                      (isFieldInvalid('region') ? 
                        'border-red-500 focus:border-red-500' : 
                        'border-gray-300 focus:border-blue-500')"
              placeholder="Enter state or region"
            />
          </ng-template>
          <div *ngIf="isFieldInvalid('region')" class="mt-1 text-sm text-red-600">
            This field is required
          </div>
        </div>

        <!-- City -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            City *
          </label>
          <select
            *ngIf="availableCities.length > 0; else cityInput"
            formControlName="city"
            [class]="'mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ' + 
                    (isFieldInvalid('city') ? 
                      'border-red-500 focus:border-red-500' : 
                      'border-gray-300 focus:border-blue-500')"
          >
            <option value="">Select City</option>
            <option *ngFor="let city of availableCities" [value]="city.name">
              {{ city.name }}
            </option>
          </select>
          <ng-template #cityInput>
            <input
              type="text"
              formControlName="city"
              [class]="'mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ' + 
                      (isFieldInvalid('city') ? 
                        'border-red-500 focus:border-red-500' : 
                        'border-gray-300 focus:border-blue-500')"
              placeholder="Enter city"
            />
          </ng-template>
          <div *ngIf="isFieldInvalid('city')" class="mt-1 text-sm text-red-600">
            This field is required
          </div>
        </div>
      </div>
    </div>
  `
})
export class LocationFormComponent implements OnInit {
  locationForm!: FormGroup;
  availableStates: State[] = [];
  availableCities: City[] = [];

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    if (this.controlContainer && this.controlContainer.control instanceof FormGroup) {
      const locationControl = this.controlContainer.control.get('location');
      if (locationControl instanceof FormGroup) {
        this.locationForm = locationControl;
        
        // Subscribe to country changes
        this.locationForm.get('country')?.valueChanges.subscribe(countryCode => {
          this.updateAvailableStates(countryCode);
        });

        // Subscribe to state changes
        this.locationForm.get('region')?.valueChanges.subscribe(stateCode => {
          this.updateAvailableCities(stateCode);
        });

        // Initialize states if country is already selected
        const currentCountry = this.locationForm.get('country')?.value;
        if (currentCountry) {
          this.updateAvailableStates(currentCountry);
          
          // Initialize cities if state is already selected
          const currentState = this.locationForm.get('region')?.value;
          if (currentState) {
            this.updateAvailableCities(currentState);
          }
        }
      }
    }
  }

  onCountryChange() {
    const countryCode = this.locationForm.get('country')?.value;
    this.updateAvailableStates(countryCode);
    
    // Reset region and city if country changes
    if (this.locationForm.get('region')?.value) {
      this.locationForm.patchValue({ 
        region: '',
        city: ''
      });
    }
  }

  onStateChange() {
    const stateCode = this.locationForm.get('region')?.value;
    this.updateAvailableCities(stateCode);
    
    // Reset city if state changes
    if (this.locationForm.get('city')?.value) {
      this.locationForm.patchValue({ city: '' });
    }
  }

  private updateAvailableStates(countryCode: string) {
    this.availableStates = countryCode ? (STATES_BY_COUNTRY[countryCode] || []) : [];
  }

  private updateAvailableCities(stateCode: string) {
    if (!stateCode) {
      this.availableCities = [];
      return;
    }

    const country = this.locationForm.get('country')?.value;
    this.availableCities = CITIES.filter(city => 
      city.country === country && city.state === stateCode
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.locationForm?.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  detectLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.locationForm.patchValue({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Handle error appropriately
        }
      );
    }
  }
}