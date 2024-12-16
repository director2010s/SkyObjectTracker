import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { FilterChange } from './filter.types';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="form" class="p-2">
      <div class="flex flex-wrap gap-2">
        <div class="w-full sm:w-auto">
          <label class="block text-xs text-gray-500">Start Date</label>
          <input
            type="date"
            formControlName="startDate"
            class="block w-full sm:w-[140px] h-7 px-2 rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500 text-xs"
          />
        </div>
        
        <div class="w-full sm:w-auto">
          <label class="block text-xs text-gray-500">End Date</label>
          <input
            type="date"
            formControlName="endDate"
            class="block w-full sm:w-[140px] h-7 px-2 rounded-md border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500 text-xs"
          />
        </div>
      </div>
    </div>
  `
})
export class DateFilterComponent implements OnInit {
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

    // Subscribe to form changes
    this.form.valueChanges.subscribe(value => {
      this.filterChange.emit({
        type: 'dateRange',
        value: {
          startDate: value.startDate,
          endDate: value.endDate
        }
      });
    });

    // Emit initial values
    this.filterChange.emit({
      type: 'dateRange',
      value: {
        startDate: this.formatDate(startOfMonth),
        endDate: this.formatDate(now)
      }
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
