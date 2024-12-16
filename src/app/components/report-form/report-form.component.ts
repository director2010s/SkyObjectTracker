import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportFormContainerComponent } from './containers/report-form-container.component';

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportFormContainerComponent
  ],
  template: `
    <div class="max-w-3xl mx-auto p-4 ">
      <app-report-form-container 
        (ngSubmit)="$event.preventDefault()"
        class="block" 
      />
    </div>
  `,
  host: {
    class: 'block '
  }
})
export class ReportFormComponent {}