import { Component, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface MediaFile {
  file: File;
  preview: string;
  progress: number;
  error?: string;
}

const MAX_FILE_SIZE = {
  image: 5 * 1024 * 1024, // 5MB
  video: 512 * 1024 * 1024 // 512MB
};

const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif'],
  video: ['video/mp4', 'video/quicktime', 'video/x-msvideo']
};

@Component({
  selector: 'app-media-upload',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MediaUploadComponent),
      multi: true
    }
  ],
  template: `
    <div class="space-y-6">
      <!-- Image Upload Section -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Images</h3>
          <span class="text-sm text-gray-500">
            {{ images.length }}/5 images
          </span>
        </div>

        <div
          class="relative border-2 border-dashed rounded-lg p-6"
          [class.border-gray-300]="!isDraggingImage"
          [class.border-blue-500]="isDraggingImage"
          [class.bg-blue-50]="isDraggingImage"
          (dragover)="onDragOver($event, 'image')"
          (dragleave)="onDragLeave($event, 'image')"
          (drop)="onDrop($event, 'image')"
        >
          <div class="text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="mt-4 flex text-sm justify-center">
              <label class="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload images</span>
                <input
                  #imageInput
                  type="file"
                  class="sr-only"
                  accept="image/jpeg,image/png,image/gif"
                  multiple
                  (change)="onFileSelected($event, 'image')"
                />
              </label>
              <p class="pl-1 text-gray-500">or drag and drop</p>
            </div>
            <p class="text-xs text-gray-500 mt-2">
              JPEG, PNG, GIF up to 5MB each
            </p>
          </div>
        </div>

        <!-- Image Previews -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4" *ngIf="images.length > 0">
          <div
            *ngFor="let image of images; let i = index"
            class="relative rounded-lg overflow-hidden group"
          >
            <img
              [src]="image.preview"
              class="h-32 w-full object-cover"
              [alt]="'Image ' + (i + 1)"
            />
            
            <!-- Progress Overlay -->
            <div
              *ngIf="image.progress < 100"
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div class="w-16 h-16 relative">
                <svg class="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="white"
                    stroke-width="3"
                    stroke-dasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    stroke-width="3"
                    [attr.stroke-dasharray]="image.progress + ', 100'"
                  />
                </svg>
                <span class="absolute inset-0 flex items-center justify-center text-white text-sm">
                  {{ image.progress }}%
                </span>
              </div>
            </div>

            <!-- Error Message -->
            <div
              *ngIf="image.error"
              class="absolute inset-0 bg-red-500 bg-opacity-75 flex items-center justify-center text-white p-2 text-sm text-center"
            >
              {{ image.error }}
            </div>

            <!-- Remove Button -->
            <button
              type="button"
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              (click)="removeFile(i, 'image')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Video Upload Section -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Videos</h3>
          <span class="text-sm text-gray-500">
            {{ videos.length }}/5 videos
          </span>
        </div>

        <div
          class="relative border-2 border-dashed rounded-lg p-6"
          [class.border-gray-300]="!isDraggingVideo"
          [class.border-blue-500]="isDraggingVideo"
          [class.bg-blue-50]="isDraggingVideo"
          (dragover)="onDragOver($event, 'video')"
          (dragleave)="onDragLeave($event, 'video')"
          (drop)="onDrop($event, 'video')"
        >
          <div class="text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18v-3.333c0-.368.298-.667.667-.667h.666c.369 0 .667.299.667.667V18m-2 0h28a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V20a2 2 0 012-2z"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="mt-4 flex text-sm justify-center">
              <label class="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload videos</span>
                <input
                  #videoInput
                  type="file"
                  class="sr-only"
                  accept="video/mp4,video/quicktime,video/x-msvideo"
                  multiple
                  (change)="onFileSelected($event, 'video')"
                />
              </label>
              <p class="pl-1 text-gray-500">or drag and drop</p>
            </div>
            <p class="text-xs text-gray-500 mt-2">
              MP4, MOV, AVI up to 512MB each
            </p>
          </div>
        </div>

        <!-- Video List -->
        <div class="space-y-3" *ngIf="videos.length > 0">
          <div
            *ngFor="let video of videos; let i = index"
            class="relative bg-gray-50 rounded-lg p-4 flex items-center"
          >
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ video.file.name }}
              </p>
              <p class="text-sm text-gray-500">
                {{ formatFileSize(video.file.size) }}
              </p>
            </div>

            <!-- Progress Bar -->
            <div
              *ngIf="video.progress < 100"
              class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden ml-4"
            >
              <div
                class="h-full bg-blue-600 transition-all duration-300"
                [style.width.%]="video.progress"
              ></div>
            </div>

            <!-- Error Message -->
            <div
              *ngIf="video.error"
              class="ml-4 text-sm text-red-500"
            >
              {{ video.error }}
            </div>

            <!-- Remove Button -->
            <button
              type="button"
              class="ml-4 text-gray-400 hover:text-red-500"
              (click)="removeFile(i, 'video')"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class MediaUploadComponent implements ControlValueAccessor {
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('videoInput') videoInput!: ElementRef<HTMLInputElement>;

  images: MediaFile[] = [];
  videos: MediaFile[] = [];
  isDraggingImage = false;
  isDraggingVideo = false;

  onChange: any = () => {};
  onTouch: any = () => {};

  onFileSelected(event: Event, type: 'image' | 'video') {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files), type);
    }
  }

  onDragOver(event: DragEvent, type: 'image' | 'video') {
    event.preventDefault();
    event.stopPropagation();
    if (type === 'image') {
      this.isDraggingImage = true;
    } else {
      this.isDraggingVideo = true;
    }
  }

  onDragLeave(event: DragEvent, type: 'image' | 'video') {
    event.preventDefault();
    event.stopPropagation();
    if (type === 'image') {
      this.isDraggingImage = false;
    } else {
      this.isDraggingVideo = false;
    }
  }

  onDrop(event: DragEvent, type: 'image' | 'video') {
    event.preventDefault();
    event.stopPropagation();
    if (type === 'image') {
      this.isDraggingImage = false;
    } else {
      this.isDraggingVideo = false;
    }

    const files = Array.from(event.dataTransfer?.files || []);
    if (files.length > 0) {
      this.handleFiles(files, type);
    }
  }

  removeFile(index: number, type: 'image' | 'video') {
    if (type === 'image') {
      this.images.splice(index, 1);
    } else {
      this.videos.splice(index, 1);
    }
    this.emitChange();
  }

  writeValue(value: any): void {
    if (value) {
      this.images = value.images || [];
      this.videos = value.videos || [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  private async handleFiles(files: File[], type: 'image' | 'video') {
    const maxFiles = 5;
    const currentFiles = type === 'image' ? this.images : this.videos;
    const remainingSlots = maxFiles - currentFiles.length;
    
    if (remainingSlots <= 0) {
      alert(`Maximum ${maxFiles} ${type}s allowed`);
      return;
    }

    const validFiles = files.slice(0, remainingSlots).filter(file => {
      // Check file type
      if (!ALLOWED_TYPES[type].includes(file.type)) {
        alert(`Invalid ${type} type. Allowed types: ${ALLOWED_TYPES[type].join(', ')}`);
        return false;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE[type]) {
        alert(`${type} size must be less than ${this.formatFileSize(MAX_FILE_SIZE[type])}`);
        return false;
      }

      return true;
    });

    for (const file of validFiles) {
      const mediaFile: MediaFile = {
        file,
        preview: type === 'image' ? await this.createImagePreview(file) : '',
        progress: 0
      };

      if (type === 'image') {
        this.images.push(mediaFile);
      } else {
        this.videos.push(mediaFile);
      }
    }

    this.emitChange();
  }

  private createImagePreview(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e: any) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  private emitChange() {
    this.onChange({
      images: this.images,
      videos: this.videos
    });
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}