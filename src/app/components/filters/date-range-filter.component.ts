import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { FilterChange } from './filter.types';

@Component({
  selector: 'app-date-range-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="p-2">
      <div [formGroup]="form" class="flex items-center flex-wrap gap-2">
        <span class="text-sm text-gray-700">Viewing reports from</span>
        <div class="w-auto">
          <input
            type="date"
            formControlName="startDate"
            class="block w-[140px] h-7 px-2 rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500 text-xs"
          />
        </div>
        <span class="text-sm text-gray-700">to</span>
        <div class="w-auto">
          <input
            type="date"
            formControlName="endDate"
            class="block w-[140px] h-7 px-2 rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500 text-xs"
          />
        </div>
      </div>
    </div>
  `
})
export class DateRangeFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<FilterChange>();
  
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit() {
    // Set default dates
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    this.form.patchValue({
      startDate: this.formatDate(startOfMonth),
      endDate: this.formatDate(now)
    });

    // Emit initial values
    this.emitFilterChange();

    // Subscribe to form changes
    this.form.valueChanges.subscribe(() => {
      this.emitFilterChange();
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private emitFilterChange() {
    const startDate = this.form.get('startDate')?.value;
    const endDate = this.form.get('endDate')?.value;

    this.filterChange.emit({
      type: 'dateRange',
      value: {
        start: startDate ? new Date(startDate) : null,
        end: endDate ? new Date(endDate) : null
      }
    });
  }
}