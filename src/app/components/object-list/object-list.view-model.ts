import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SkyObject } from '../../models/sky-object.model';
import { SkyObjectService, SkyObjectFilters } from '../../services/sky-object.service';
import { ObjectListState } from './object-list.types';

@Injectable()  // Remove providedIn: 'root' to use component-level injection
export class ObjectListViewModel {
  private skyObjectService!: SkyObjectService;
  private destroy$!: Subject<void>;

  state: ObjectListState = {
    objects: [],
    selectedObject: null,
    isLoading: false,
    error: null,
    filters: {
      dateRange: null,
      objectTypes: [],
      location: null
    }
  };

  initialize(skyObjectService: SkyObjectService, destroy$: Subject<void>) {
    this.skyObjectService = skyObjectService;
    this.destroy$ = destroy$;
    this.loadObjects();
  }

  loadObjects() {
    this.state.isLoading = true;
    this.state.error = null;

    this.skyObjectService.getObjects(this.state.filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (objects) => {
          this.state.objects = this.sortObjectsByDate(objects);
          this.state.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading objects:', error);
          this.state.error = 'Failed to load sightings. Please try again.';
          this.state.isLoading = false;
        }
      });
  }

  updateFilters(filters: Partial<SkyObjectFilters>) {
    this.state.filters = {
      ...this.state.filters,
      ...filters
    };
    this.loadObjects();
  }

  private sortObjectsByDate(objects: SkyObject[]): SkyObject[] {
    return [...objects].sort((a, b) => {
      const dateA = new Date(a.reportedAt).getTime();
      const dateB = new Date(b.reportedAt).getTime();
      return dateB - dateA; // Sort in descending order (newest first)
    });
  }

  selectObject(object: SkyObject) {
    this.state.selectedObject = object;
  }

  closeDetail() {
    this.state.selectedObject = null;
  }

  isObjectSelected(object: SkyObject): boolean {
    return this.state.selectedObject?.id === object.id;
  }

  trackById(_: number, object: SkyObject): string {
    return object.id;
  }
}