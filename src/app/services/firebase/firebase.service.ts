import { Injectable } from '@angular/core';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '../../config/firebase.config';
import { Observable, from, map } from 'rxjs';
import { SkyObject } from '../../models/sky-object.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly COLLECTION_NAME = 'sky-objects';

  // Create
  addSkyObject(object: Omit<SkyObject, 'id'>): Observable<string> {
    const objectWithTimestamp = {
      ...object,
      reportedAt: Timestamp.fromDate(object.reportedAt),
      createdAt: Timestamp.fromDate(new Date()),
    };

    console.log("xxx_addSkyObject:", objectWithTimestamp);
    
    return from(addDoc(collection(db, this.COLLECTION_NAME), objectWithTimestamp))
      .pipe(map(docRef => docRef.id));
  }

  // Read
  getSkyObjects(): Observable<SkyObject[]> {
    const q = query(
      collection(db, this.COLLECTION_NAME),
      orderBy('reportedAt', 'desc')
    );

    return from(getDocs(q)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => this.convertToSkyObject(doc.id, doc.data()))
      )
    );
  }

  getSkyObjectById(id: string): Observable<SkyObject | null> {
    return from(getDoc(doc(db, this.COLLECTION_NAME, id))).pipe(
      map(docSnapshot => {
        if (!docSnapshot.exists()) return null;
        return this.convertToSkyObject(docSnapshot.id, docSnapshot.data());
      })
    );
  }

  // Update
  updateSkyObject(id: string, updates: Partial<SkyObject>): Observable<void> {
    const docRef = doc(db, this.COLLECTION_NAME, id);
    return from(updateDoc(docRef, updates));
  }

  // Delete
  deleteSkyObject(id: string): Observable<void> {
    return from(deleteDoc(doc(db, this.COLLECTION_NAME, id)));
  }

  // Query
  querySkyObjects(filters: {
    types?: string[],
    dateRange?: { start: Date; end: Date },
    location?: { country?: string; region?: string; city?: string }
  }): Observable<SkyObject[]> {
    let q = query(collection(db, this.COLLECTION_NAME));

    if (filters.types?.length) {
      q = query(q, where('type', 'in', filters.types));
    }

    if (filters.dateRange) {
      q = query(
        q,
        where('reportedAt', '>=', Timestamp.fromDate(filters.dateRange.start)),
        where('reportedAt', '<=', Timestamp.fromDate(filters.dateRange.end))
      );
    }

    // Location filtering is done in memory due to Firestore limitations
    return from(getDocs(q)).pipe(
      map(snapshot => {
        let results = snapshot.docs.map(doc => 
          this.convertToSkyObject(doc.id, doc.data())
        );

        if (filters.location) {
          results = this.filterByLocation(results, filters.location);
        }

        return results;
      })
    );
  }

  private convertToSkyObject(id: string, data: DocumentData): SkyObject {
    return {
      id,
      name: data['name'],
      type: data['type'],
      description: data['description'],
      coordinates: data['coordinates'],
      reportedAt: (data['reportedAt'] as Timestamp).toDate(),
      reportedBy: data['reportedBy'],
      status: data['status'] || 'pending'
    };
  }

  private filterByLocation(
    objects: SkyObject[], 
    location: { country?: string; region?: string; city?: string }
  ): SkyObject[] {
    return objects.filter(obj => {
      if (location.country && obj.location?.country !== location.country) return false;
      if (location.region && obj.location?.region !== location.region) return false;
      if (location.city && obj.location?.city !== location.city) return false;
      return true;
    });
  }
}