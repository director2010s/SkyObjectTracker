import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateRangeFilterComponent } from './date-range-filter.component';
import { LocationFilterComponent } from './location-filter.component';
import { ObjectTypeFilterComponent } from './object-type-filter.component';
import { FilterState, FilterChange } from './filter.types';
import { SkyObjectFilters } from '../../services/sky-object.service';
import { COUNTRIES } from '../../utils/constants/countries';
import { STATES_BY_COUNTRY } from '../../utils/constants/states';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DateRangeFilterComponent,
    LocationFilterComponent,
    ObjectTypeFilterComponent
  ],
  template: `
    <div class="bg-white rounded-lg shadow-md">
      <!-- Mobile Filter Toggle -->
      <button
        (click)="toggleFilters()"
        class="md:hidden w-full px-4 py-3 flex items-center justify-between text-gray-700 hover:bg-gray-50"
      >
        <span class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
        </span>
        <svg 
          class="w-5 h-5 transform transition-transform duration-200"
          [class.rotate-180]="isExpanded"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Filter Content -->
      <div
        class="md:block"
        [class.hidden]="!isExpanded"
      >
        <div class="p-4 space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              (click)="resetFilters()"
              class="text-sm text-blue-600 hover:text-blue-800"
            >
              Reset all
            </button>
          </div>

          <!-- Date Range Filter -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">Date Range</h3>
            <app-date-range-filter
              (filterChange)="onFilterChange($event)"
            />
          </div>

          <!-- Object Type Filter -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">Object Type</h3>
            <app-object-type-filter
              (filterChange)="onFilterChange($event)"
            />
          </div>

          <!-- Location Filter -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">Location</h3>
            <app-location-filter
              (filterChange)="onFilterChange($event)"
            />
          </div>
        </div>
      </div>
    </div>
  `
})
export class FilterPanelComponent implements OnInit {
  @Output() filtersChange = new EventEmitter<SkyObjectFilters>();
  
  isExpanded = true;
  currentFilters: FilterState = {
    dateRange: {
      start: null,
      end: null
    },
    objectTypes: [],
    location: {
      country: '',
      region: '',
      city: '',
      address: ''
    }
  };

  ngOnInit() {
    this.emitFilters();
  }

  toggleFilters() {
    this.isExpanded = !this.isExpanded;
  }

  resetFilters() {
    this.currentFilters = {
      dateRange: {
        start: null,
        end: null
      },
      objectTypes: [],
      location: {
        country: '',
        region: '',
        city: '',
        address: ''
      }
    };
    this.emitFilters();
  }

  onFilterChange(change: FilterChange) {
    switch (change.type) {
      case 'dateRange':
        this.currentFilters.dateRange = change.value;
        break;
      case 'location':
        this.currentFilters.location = change.value;
        console.log("filter_location:", change.value);
        break;
      case 'objectTypes':
        this.currentFilters.objectTypes = change.value;
        break;
    }
    this.emitFilters();
  }

  private emitFilters() {
    const filters: SkyObjectFilters = {
      dateRange: this.currentFilters.dateRange,
      objectTypes: this.currentFilters.objectTypes,
      location: this.currentFilters.location.country ? {
        country: this.getCountryName(this.currentFilters.location.country),
        region: this.getStateName(this.currentFilters.location.country, this.currentFilters.location.region) || this.currentFilters.location.region || null,
        city: this.currentFilters.location.city || null,
        address: this.currentFilters.location.address || null
      } : null
    };
    this.filtersChange.emit(filters);
  }

  private getCountryName(countryCode: string): string {
    const country = COUNTRIES.find(c => c.code === countryCode);
    return country ? country.name : countryCode;
  }

  private getStateName(countryCode: string, stateCode: string): string | null {
    const states = STATES_BY_COUNTRY[countryCode];
    if (!states || !stateCode) return null;
    
    const state = states.find(s => s.code === stateCode);
    return state ? state.name : null;
  }
}