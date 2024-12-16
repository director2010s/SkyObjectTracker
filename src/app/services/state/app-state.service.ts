import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SkyObject } from '../../models/sky-object.model';

export interface AppState {
  selectedObject: SkyObject | null;
  isLoading: boolean;
  lastUpdated: Date | null;
}

const initialState: AppState = {
  selectedObject: null,
  isLoading: false,
  lastUpdated: null
};

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private state = new BehaviorSubject<AppState>(initialState);

  // Selectors
  selectedObject$ = this.select(state => state.selectedObject);
  isLoading$ = this.select(state => state.isLoading);
  lastUpdated$ = this.select(state => state.lastUpdated);

  // Actions
  setSelectedObject(object: SkyObject | null): void {
    this.updateState({ selectedObject: object });
  }

  setLoading(isLoading: boolean): void {
    this.updateState({ isLoading });
  }

  updateLastUpdated(): void {
    this.updateState({ lastUpdated: new Date() });
  }

  // Helper methods
  private select<T>(selector: (state: AppState) => T): Observable<T> {
    return new Observable(subscriber => {
      return this.state.subscribe(state => {
        subscriber.next(selector(state));
      });
    });
  }

  private updateState(partialState: Partial<AppState>): void {
    this.state.next({
      ...this.state.value,
      ...partialState
    });
  }
}