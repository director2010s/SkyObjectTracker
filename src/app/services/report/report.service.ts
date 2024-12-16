import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FirebaseService } from '../firebase/firebase.service';
import { LinodeStorageService } from '../storage/linode-storage.service';
import { SkyObject, ObjectType } from '../../models/sky-object.model';
import { ReportFormData } from '../../components/report-form/models/report-form.types';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(
    private firebaseService: FirebaseService,
    private storageService: LinodeStorageService
  ) {}

  submitReport(formData: ReportFormData): Observable<string> {
    console.log("xxSubmitReport_:", formData);
    // First, create the report in Firebase
    return this.firebaseService.addSkyObject({
      name: formData.name,
      type: formData.objectType,  // Now correctly typed as ObjectType
      description: formData.description,
      coordinates: formData.location.coordinates!,
      location: {
        street: formData.location.street,
        city: formData.location.city,
        region: formData.location.region,
        country: formData.location.country
      },
      reportedAt: new Date(formData.dateTime),
      reportedBy: 'Anonymous', // TODO: Replace with actual user info
      status: 'pending'
    }).pipe(
      switchMap(reportId => {
        // Then upload all media files
        const mediaUploads: Observable<void>[] = [];

        // Upload images
        formData.media.images.forEach((image: File) => {
          mediaUploads.push(
            this.storageService.uploadMedia(image, reportId).pipe(
              switchMap(response => 
                this.firebaseService.updateSkyObject(reportId, {
                  media: { 
                    images: [{ url: response.url, key: response.key }]
                  }
                })
              )
            )
          );
        });

        // Upload videos
        formData.media.videos.forEach((video: File) => {
          mediaUploads.push(
            this.storageService.uploadMedia(video, reportId).pipe(
              switchMap(response =>
                this.firebaseService.updateSkyObject(reportId, {
                  media: {
                    videos: [{ url: response.url, key: response.key }]
                  }
                })
              )
            )
          );
        });

        // Wait for all uploads to complete
        return mediaUploads.length > 0
          ? forkJoin(mediaUploads).pipe(map(() => reportId))
          : of(reportId);
      })
    );
  }

  getReport(id: string): Observable<SkyObject | null> {
    return this.firebaseService.getSkyObjectById(id);
  }

  deleteReport(id: string): Observable<void> {
    return this.firebaseService.getSkyObjectById(id).pipe(
      switchMap(report => {
        if (!report) throw new Error('Report not found');

        const deleteMediaTasks: Observable<void>[] = [];

        // Delete all associated media files
        if (report.media?.images) {
          report.media.images.forEach(image => {
            deleteMediaTasks.push(this.storageService.deleteMedia(image.key));
          });
        }

        if (report.media?.videos) {
          report.media.videos.forEach(video => {
            deleteMediaTasks.push(this.storageService.deleteMedia(video.key));
          });
        }

        // Delete media files first, then delete the report
        return deleteMediaTasks.length > 0
          ? forkJoin(deleteMediaTasks).pipe(
              switchMap(() => this.firebaseService.deleteSkyObject(id))
            )
          : this.firebaseService.deleteSkyObject(id);
      })
    );
  }
}