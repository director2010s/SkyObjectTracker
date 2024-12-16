import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { SkyObjectService, SkyObjectFilters } from '../../services/sky-object.service';
import { ObjectListItemComponent } from './object-list-item/object-list-item.component';
import { ObjectDetailComponent } from './object-detail/object-detail.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message.component';
import { FilterPanelComponent } from '../filters/filter-panel.component';
import { ObjectListViewModel } from './object-list.view-model';
import { listItemAnimation, detailViewAnimation } from './object-list.animations';

@Component({
  selector: 'app-object-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    ObjectListItemComponent,
    ObjectDetailComponent,
    EmptyStateComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    FilterPanelComponent
  ],
  providers: [ObjectListViewModel],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-4 border-b">
        <h2 class="text-xl font-semibold">Reported Objects List</h2>
      </div>

      <app-filter-panel (filtersChange)="onFiltersChange($event)" />

      <div class="relative">
        <div class="divide-y max-h-[600px] overflow-y-auto">
          <ng-container *ngIf="!viewModel.state.isLoading && !viewModel.state.error && viewModel.state.objects.length > 0">
            <app-object-list-item
              *ngFor="let object of viewModel.state.objects; trackBy: viewModel.trackById"
              [object]="object"
              [isActive]="viewModel.isObjectSelected(object)"
              (click)="viewModel.selectObject(object)"
              [@listItem]
            />
          </ng-container>

          <app-empty-state
            *ngIf="!viewModel.state.isLoading && !viewModel.state.error && viewModel.state.objects.length === 0"
          />
        </div>

        <app-loading-spinner *ngIf="viewModel.state.isLoading" />
        <app-error-message
          *ngIf="viewModel.state.error"
          [message]="viewModel.state.error"
        />
      </div>
    </div>

    <app-object-detail
      *ngIf="viewModel.state.selectedObject"
      [object]="viewModel.state.selectedObject"
      (close)="viewModel.closeDetail()"
      [@detailView]
    />
  `,
  animations: [listItemAnimation, detailViewAnimation]
})
export class ObjectListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    public viewModel: ObjectListViewModel,
    private skyObjectService: SkyObjectService
  ) {}

  ngOnInit() {
    this.viewModel.initialize(this.skyObjectService, this.destroy$);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFiltersChange(filters: SkyObjectFilters) {
    this.viewModel.updateFilters(filters);
  }
}