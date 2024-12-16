import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
      <div class="text-center p-4">
        <p class="text-red-600 mb-4">{{ message }}</p>
        <button
          (click)="retry.emit()"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  `
})
export class ErrorMessageComponent {
  @Input() message = 'An error occurred';
  @Output() retry = new EventEmitter<void>();
}