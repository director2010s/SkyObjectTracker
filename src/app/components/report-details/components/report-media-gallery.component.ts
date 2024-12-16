import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-media-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Media Gallery</h2>

      <!-- Images -->
      <div *ngIf="images.length > 0" class="mb-6">
        <h3 class="text-sm font-medium text-gray-500 mb-3">Images</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div
            *ngFor="let image of images"
            class="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              [src]="image.url"
              [alt]="image.caption || 'Report image'"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- Videos -->
      <div *ngIf="videos.length > 0">
        <h3 class="text-sm font-medium text-gray-500 mb-3">Videos</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            *ngFor="let video of videos"
            class="relative aspect-video rounded-lg overflow-hidden bg-gray-100"
          >
            <video
              [src]="video.url"
              controls
              class="absolute inset-0 w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ReportMediaGalleryComponent {
  @Input() images: Array<{ url: string; caption?: string }> = [];
  @Input() videos: Array<{ url: string; caption?: string }> = [];
}