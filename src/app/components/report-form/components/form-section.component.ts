import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
      <ng-content></ng-content>
    </div>
  `
})
export class FormSectionComponent {
  @Input() title!: string;
}