import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-submit-button',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    button {
      color: white;
      font-weight: 500;
    }
  `],
  template: `
    <div class="flex justify-end">
      <button
        type="submit"
        [disabled]="isSubmitting"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span *ngIf="!isSubmitting">Submit Report</span>
        <span *ngIf="isSubmitting">Submitting...</span>
      </button>
    </div>
  `
})
export class FormSubmitButtonComponent {
  @Input() isSubmitting = false;
}