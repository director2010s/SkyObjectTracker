import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface UploadResponse {
  url: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class LinodeStorageService {
  private readonly BUCKET_URL = environment.linodeObjectStorage.bucketUrl;
  private readonly API_URL = environment.linodeObjectStorage.apiUrl;

  constructor(private http: HttpClient) {}

  uploadMedia(file: File, reportId: string): Observable<UploadResponse> {
    // Generate a unique key for the file
    const key = `${reportId}/${Date.now()}-${file.name}`;
    const contentType = file.type;

    // First, get a pre-signed URL for upload
    return this.getPresignedUrl(key, contentType).pipe(
      switchMap(presignedUrl => this.uploadToPresignedUrl(presignedUrl, file, contentType)),
      map(() => ({
        url: `${this.BUCKET_URL}/${key}`,
        key
      }))
    );
  }

  deleteMedia(key: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/objects/${key}`);
  }

  private getPresignedUrl(key: string, contentType: string): Observable<string> {
    return this.http.post<{ url: string }>(`${this.API_URL}/presigned-url`, {
      key,
      contentType
    }).pipe(map(response => response.url));
  }

  private uploadToPresignedUrl(
    presignedUrl: string, 
    file: File, 
    contentType: string
  ): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': contentType
    });

    return this.http.put<void>(presignedUrl, file, { headers });
  }
}