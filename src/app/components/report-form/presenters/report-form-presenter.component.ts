import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroupDirective, FormGroup } from '@angular/forms';
import { ReportFormState } from '../models/report-form.types';
import { LocationFormComponent } from '../components/location-form.component';
import { DateTimeFormComponent } from '../components/date-time-form.component';
import { ObjectTypeFormComponent } from '../components/object-type-form.component';
import { DescriptionFormComponent } from '../components/description-form.component';
import { MediaUploadFormComponent } from '../components/media-upload-form.component';
import { TermsFormComponent } from '../components/terms-form.component';
import { FormSubmitButtonComponent } from '../components/form-submit-button.component';
import { NameFormComponent } from '../components/name-form.component';

@Component({
  selector: 'app-report-form-presenter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NameFormComponent,
    LocationFormComponent,
    DateTimeFormComponent,
    ObjectTypeFormComponent,
    DescriptionFormComponent,
    MediaUploadFormComponent,
    TermsFormComponent,
    FormSubmitButtonComponent
  ],
  viewProviders: [FormGroupDirective],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-6">Submit Sighting Report</h1>

      <form [formGroup]="state.form" (ngSubmit)="onSubmit($event)" class="space-y-6">
        <app-name-form />
        <app-object-type-form />
        <app-date-time-form />
        <app-location-form />
        <app-description-form />
        <app-media-upload-form />
        <app-terms-form />

        <app-form-submit-button
          [isSubmitting]="state.isSubmitting"
        />

        <!-- Success Message -->
        <div *ngIf="state.success" class="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
          Report submitted successfully!
        </div>

        <!-- Error Message -->
        <div *ngIf="state.error" class="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {{ state.error }}
        </div>

        <!-- Validation Message -->
        <div *ngIf="showValidationMessage" class="mt-4 p-4 bg-yellow-50 text-yellow-700 rounded-md">
          Please fill in all required fields correctly.
        </div>
      </form>
    </div>
  `
})
export class ReportFormPresenterComponent {
  @Input() state!: ReportFormState;
  @Output() formSubmit = new EventEmitter<Event>();
  showValidationMessage = false;

  onSubmit(event: Event) {
    event.preventDefault();
    this.formSubmit.emit(event);
  }
}