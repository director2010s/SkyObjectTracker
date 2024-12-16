import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SkyObject } from '../../models/sky-object.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  private selectedObjectSubject = new BehaviorSubject<SkyObject | null>(null);
  selectedObject$ = this.selectedObjectSubject.asObservable();

  setSelectedObject(object: SkyObject | null) {
    this.selectedObjectSubject.next(object);
  }

  getSelectedObject(): Observable<SkyObject | null> {
    return this.selectedObject$;
  }
}