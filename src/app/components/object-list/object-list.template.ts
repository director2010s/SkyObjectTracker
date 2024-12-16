import { SkyObject } from '../../models/sky-object.model';

export function getObjectListTemplate() {
  return `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-4 border-b">
        <h2 class="text-xl font-semibold">Reported Objects List</h2>
      </div>

      <div class="relative">
        <div class="divide-y max-h-[600px] overflow-y-auto">
          <ng-container *ngIf="!isLoading && !error && objects.length > 0">
            <app-object-list-item
              *ngFor="let object of objects; trackBy: trackByFn"
              [object]="object"
              [isActive]="selectedObject?.id === object.id"
              (click)="onObjectSelect(object)"
              [@listItem]
            />
          </ng-container>

          <app-empty-state
            *ngIf="!isLoading && !error && objects.length === 0"
          />
        </div>

        <app-loading-spinner *ngIf="isLoading" />
        
        <app-error-message
          *ngIf="error"
          [message]="error"
          (retry)="loadObjects()"
        />
      </div>
    </div>

    <app-object-detail
      *ngIf="selectedObject"
      [object]="selectedObject"
      (close)="closeDetail()"
      [@detailView]
    />
  `;
}

export function trackByObjectId(_: number, object: SkyObject): string {
  return object.id;
}