import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ControlContainer, FormGroupDirective } from '@angular/forms';
import { FileUploadComponent } from './file-upload';
import { FileUploadConfig } from './file-upload/file-upload.types';

@Component({
  selector: 'app-media-upload-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FileUploadComponent],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  template: `
    <div class="space-y-6" formGroupName="media">
      <app-file-upload
        formControlName="images"
        [config]="imageConfig"
      />
      
      <app-file-upload
        formControlName="videos"
        [config]="videoConfig"
      />
    </div>
  `
})
export class MediaUploadFormComponent {
  imageConfig: FileUploadConfig = {
    accept: 'image/jpeg,image/png,image/gif',
    maxSize: 5, // 5MB
    fileType: 'image'
  };

  videoConfig: FileUploadConfig = {
    accept: 'video/mp4,video/webm',
    maxSize: 50, // 50MB
    fileType: 'video'
  };
}