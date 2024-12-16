import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SkyObject } from '../../../models/sky-object.model';
import { ObjectTypeIconComponent } from '../object-list-item/object-type-icon.component';
import { COUNTRIES } from '../../../utils/constants/countries';

@Component({
  selector: 'app-object-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, ObjectTypeIconComponent],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="p-6 border-b flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <app-object-type-icon [type]="object.type" />
            <h2 class="text-2xl font-semibold">{{ object.name }}</h2>
          </div>
          <button 
            (click)="close.emit()"
            class="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 overflow-y-auto">
          <div class="space-y-6">
            <!-- Basic Info -->
            <div>
              <h3 class="text-lg font-medium text-gray-900">Details</h3>
              <dl class="mt-3 space-y-3">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Type</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ object.type }}</dd>
                </div>
                <div *ngIf="object.subtype">
                  <dt class="text-sm font-medium text-gray-500">Subtype</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ object.subtype }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Reported By</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ object.reportedBy }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Date</dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ object.reportedAt | date:'medium' }}
                  </dd>
                </div>
              </dl>
            </div>

            <!-- Location Info -->
            <div *ngIf="object.location">
              <h3 class="text-lg font-medium text-gray-900">Location</h3>
              <dl class="mt-3 space-y-3">
                <div *ngIf="object.location.country">
                  <dt class="text-sm font-medium text-gray-500">Country</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ getCountryName(object.location.country) }}</dd>
                </div>
                <div *ngIf="object.location.region">
                  <dt class="text-sm font-medium text-gray-500">Region/State</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ object.location.region }}</dd>
                </div>
                <div *ngIf="object.location.city">
                  <dt class="text-sm font-medium text-gray-500">City</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ object.location.city }}</dd>
                </div>
                <div *ngIf="object.location.street">
                  <dt class="text-sm font-medium text-gray-500">Street</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ object.location.street }}</dd>
                </div>
                <div *ngIf="object.coordinates">
                  <dt class="text-sm font-medium text-gray-500">Coordinates</dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ object.coordinates.latitude }}, {{ object.coordinates.longitude }}
                  </dd>
                </div>
              </dl>
            </div>

            <!-- Description -->
            <div *ngIf="object.description">
              <h3 class="text-lg font-medium text-gray-900">Description</h3>
              <p class="mt-2 text-sm text-gray-600">{{ object.description }}</p>
            </div>

            <!-- Witnesses -->
            <div *ngIf="object.witnesses">
              <h3 class="text-lg font-medium text-gray-900">Witnesses</h3>
              <p class="mt-2 text-sm text-gray-600">{{ object.witnesses }}</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t">
          <button
            (click)="close.emit()"
            class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  `
})
export class ObjectDetailComponent {
  @Input() object!: SkyObject;
  @Output() close = new EventEmitter<void>();

  getCountryName(countryCode: string): string {
    const country = COUNTRIES.find(c => c.code === countryCode);
    return country ? country.name : countryCode;
  }
}