import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, query, orderBy, getDocs } from '@angular/fire/firestore';
import { SkyObject } from '../models/sky-object.model';
import { COUNTRIES } from '../utils/constants/countries';

export interface SkyObjectFilters {
  dateRange: { start: Date | null; end: Date | null } | null;
  objectTypes: string[];
  location: {
    country: string | null;
    region?: string | null;
    city?: string | null;
    address?: string | null;
  } | null;
}

@Injectable({
  providedIn: 'root'
})
export class SkyObjectService {
  constructor(private firestore: Firestore) {}

  private getCountryCode(countryName: string): string | null {
    const country = COUNTRIES.find(c => c.name === countryName);
    return country ? country.code : null;
  }

  getObjects(filters?: SkyObjectFilters): Observable<SkyObject[]> {
    return new Observable<SkyObject[]>(observer => {
      const reportsRef = collection(this.firestore, 'sky-objects');
      const q = query(reportsRef, orderBy('createdAt', 'desc'));

      getDocs(q)
        .then(snapshot => {
          let objects = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            reportedAt: doc.data()['reportedAt']?.toDate() // Convert Firestore Timestamp to Date
          } as SkyObject));

          if (filters?.dateRange) {
            const startDate = filters.dateRange.start || new Date(2024, 0, 1);
            const endDate = filters.dateRange.end || (() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(23, 59, 59, 999);
              return tomorrow;
            })();

            // Normalize dates to start of day and end of day
            const normalizedStartDate = new Date(startDate);
            normalizedStartDate.setHours(0, 0, 0, 0);
            
            const normalizedEndDate = new Date(endDate);
            normalizedEndDate.setHours(23, 59, 59, 999);

            objects = objects.filter(obj => {
              const reportDate = new Date(obj.reportedAt);
              reportDate.setHours(0, 0, 0, 0); // Normalize to start of day for comparison
              return reportDate >= normalizedStartDate && reportDate <= normalizedEndDate;
            });
          }

          if (filters?.objectTypes && filters.objectTypes.length > 0) {
            objects = objects.filter(obj => filters.objectTypes!.includes(obj.type));
          }

          if (filters?.location) {
            if (filters.location.country) {
              const countryCode = this.getCountryCode(filters.location.country);
              if (countryCode) {
                objects = objects.filter(obj => {
                  const objCountryCode = obj.location?.country;
                  return objCountryCode === countryCode;
                });
              }
            }

            if (filters.location.region) {
              objects = objects.filter(obj => {
                return obj.location?.region === filters.location?.region;
              });
            }

            if (filters.location.city) {
              objects = objects.filter(obj => {
                return obj.location?.city === filters.location?.city;
              });
            }
          }

          observer.next(objects);
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching objects:', error);
          observer.error('Failed to fetch objects');
        });
    });
  }

  getObjectById(id: string): Observable<SkyObject | undefined> {
    return new Observable<SkyObject | undefined>(observer => {
      const reportsRef = collection(this.firestore, 'sky-objects');
      const q = query(reportsRef);

      getDocs(q)
        .then(snapshot => {
          const doc = snapshot.docs.find(d => d.id === id);
          if (doc) {
            const object = {
              id: doc.id,
              ...doc.data(),
              reportedAt: doc.data()['reportedAt']?.toDate()
            } as SkyObject;
            observer.next(object);
          } else {
            observer.next(undefined);
          }
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching sky object:', error);
          observer.error('Failed to fetch sky object');
        });
    });
  }
}