import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../../services/report/report.service';
import { CustomValidators } from '../../../utils/validation.utils';
import { ReportFormData, ReportFormState } from '../models/report-form.types';
import { ObjectType } from '../../../models/sky-object.model';

@Injectable()
export class ReportFormViewModel {
  state: ReportFormState = {
    form: this.createForm(),
    isSubmitting: false,
    error: null,
    success: false
  };

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService
  ) {}

  initialize() {
    // Reset form to initial state
    this.state.form = this.createForm();
    this.state.isSubmitting = false;
    this.state.error = null;
    this.state.success = false;

    // Subscribe to form value changes
    this.state.form.valueChanges.subscribe(() => {
      console.log('\n=== Form Validation Status ===');
      Object.keys(this.state.form.controls).forEach(key => {
        const control = this.state.form.get(key);
        if (control && control instanceof FormGroup) {
          console.log(`\n${key}:`);
          Object.keys(control.controls).forEach(subKey => {
            const subControl = control.get(subKey);
            if (subControl && !subControl.valid) {
              console.log(`  ${subKey}: valid=${subControl.valid}, touched=${subControl.touched}, errors=`, subControl.errors);
            }
          });
        } else if (control && !control.valid) {
          console.log(`${key}: valid=${control.valid}, touched=${control.touched}, errors=`, control.errors);
        }
      });
      console.log('\nOverall form valid:', this.state.form.valid);
    });
  }

  async submitForm() {
    if (this.state.form.valid) {
      this.state.isSubmitting = true;
      this.state.error = null;

      try {
        const formValue = this.state.form.value;
        
        // Transform form data to match ReportFormData interface
        const reportData: ReportFormData = {
          name: formValue.name,
          location: {
            street: formValue.location.street || '',
            city: formValue.location.city,
            region: formValue.location.region || '',
            country: formValue.location.country,
            coordinates: {
              latitude: Number(formValue.location.latitude),
              longitude: Number(formValue.location.longitude)
            }
          },
          dateTime: new Date(
            `${formValue.dateTime.date}T${formValue.dateTime.time}`
          ),
          objectType: formValue.objectType.type as ObjectType,
          description: `${formValue.description.details}${
            formValue.description.witnesses 
              ? `\nWitnesses: ${formValue.description.witnesses}`
              : ''
          }`,
          media: {
            images: [],
            videos: []
          }
        };

        console.log('Submitting form data:', reportData);
        await this.reportService.submitReport(reportData);
        this.state.success = true;
        this.state.form.reset();
      } catch (error) {
        console.error('Form submission error:', error);
        this.state.error = 'Failed to submit report. Please try again.';
      } finally {
        this.state.isSubmitting = false;
      }
    } else {
      console.log('Form is invalid');
      Object.keys(this.state.form.controls).forEach(key => {
        const control = this.state.form.get(key);
        if (control?.invalid) {
          console.log(`Invalid control: ${key}`, control.errors);
        }
      });
    }
  }

  private createForm(): FormGroup {
    // Parse the current time string
    const currentDate = new Date('2024-12-16T05:07:56+09:00');
    
    // Format date as YYYY-MM-DD
    const dateStr = currentDate.toISOString().split('T')[0];
    
    // Format time as HH:mm
    const timeStr = currentDate.toTimeString().substring(0, 5);

    return this.fb.group({
      name: ['', [Validators.required]],
      objectType: this.fb.group({
        type: ['UFO', [Validators.required]], // Default to 'UFO' as it's a valid ObjectType
        subtype: ['']
      }),
      dateTime: this.fb.group({
        date: [dateStr, [Validators.required, CustomValidators.date]],
        time: [timeStr, [Validators.required, CustomValidators.time]]
      }),
      location: this.fb.group({
        country: ['', [Validators.required]],
        region: [''],
        city: ['', [Validators.required]],
        street: [''],
        latitude: ['', [Validators.required, CustomValidators.latitude]],
        longitude: ['', [Validators.required, CustomValidators.longitude]]
      }),
      description: this.fb.group({
        details: ['', [Validators.required]],
        witnesses: ['']
      }),
      media: this.fb.group({
        images: [[]],
        videos: [[]]
      })
    });
  }
}