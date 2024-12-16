import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SkyObject } from '../../../models/sky-object.model';
import { ObjectTypeIconComponent } from './object-type-icon.component';

@Component({
  selector: 'app-object-list-item',
  standalone: true,
  imports: [CommonModule, DatePipe, ObjectTypeIconComponent],
  template: `
    <div 
      class="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
      [class.active]="isActive"
    >
      <div class="flex items-start space-x-3">
        <app-object-type-icon [type]="object.type" />
        
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-900 truncate">
              {{ object.name }}
            </h3>
            <span class="text-xs text-gray-500">
              {{ object.reportedAt | date:'MMM d, y' }}
            </span>
          </div>
          
          <p class="mt-1 text-sm text-gray-500 line-clamp-2">
            {{ object.location?.country }} {{ object.location?.region }} {{ object.location?.city }} {{ object.location?.street }} 
          </p>
          
          <div class="mt-2 flex items-center text-xs text-gray-500">
            <span>Reported by: {{ object.reportedBy }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .active {
      @apply bg-blue-50;
    }
  `]
})
export class ObjectListItemComponent {
  @Input({ required: true }) object!: SkyObject;
  @Input() isActive = false;
}