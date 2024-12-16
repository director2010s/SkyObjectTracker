import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUploadConfig, UploadedFile, FileTypeInfo } from './file-upload.types';
import { getFileTypeInfo, createImagePreview, isValidFileType, isValidFileSize } from './file-upload.utils';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ],
  template: `
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">
        {{ config.fileType === 'image' ? 'Images' : 'Videos' }}
      </label>
      
      <div
        class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 
               border-dashed rounded-md hover:border-gray-400 transition-colors"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
      >
        <div class="space-y-1 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path *ngIf="config.fileType === 'image'"
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            />
            <path *ngIf="config.fileType === 'video'"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18v-3.333c0-.368.298-.667.667-.667h.666c.369 0 .667.299.667.667V18m-2 0h28a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V20a2 2 0 012-2z"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            />
          </svg>
          
          <div class="flex text-sm text-gray-600">
            <label class="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
              <span>Upload {{ config.fileType }}s</span>
              <input
                type="file"
                class="sr-only"
                [accept]="config.accept"
                [multiple]="true"
                (change)="onFileSelected($event)"
              />
            </label>
            <p class="pl-1">or drag and drop</p>
          </div>
          
          <p class="text-xs text-gray-500">
            {{ fileTypeInfo.extensions.join(', ') }} up to {{ fileTypeInfo.maxSize }}MB each
          </p>

          <div *ngIf="errors.length > 0" class="mt-2 text-sm text-red-600">
            <p *ngFor="let error of errors">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- File Preview -->
      <div *ngIf="files.length > 0" class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <div *ngFor="let file of files; let i = index" class="relative group">
          <img
            *ngIf="file.preview"
            [src]="file.preview"
            [alt]="file.name"
            class="h-24 w-full object-cover rounded-lg"
          />
          <div
            *ngIf="!file.preview"
            class="h-24 w-full bg-gray-100 rounded-lg flex items-center justify-center"
          >
            <span class="text-sm text-gray-500">{{ file.name }}</span>
          </div>
          
          <button
            type="button"
            (click)="removeFile(i)"
            class="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full transform translate-x-1/2 -translate-y-1/2
                   opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() config: FileUploadConfig = {
    fileType: 'image',
    accept: 'image/*',
    maxSize: 5
  };
  
  files: UploadedFile[] = [];
  errors: string[] = [];
  onChange: any = () => {};
  onTouch: any = () => {};

  get fileTypeInfo(): FileTypeInfo {
    return getFileTypeInfo(this.config.fileType, this.config.maxSize);
  }

  get maxFiles(): number {
    return 5; // Default max files
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      await this.processFiles(Array.from(input.files));
    }
  }

  async onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    const dt = event.dataTransfer;
    if (!dt) return;
    
    if (dt.files) {
      await this.processFiles(Array.from(dt.files));
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer!.dropEffect = 'copy';
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.updateValue();
  }

  writeValue(files: UploadedFile[]): void {
    if (files) {
      this.files = files;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  private async processFiles(newFiles: File[]) {
    this.errors = [];
    
    const validFiles = this.validateFiles(newFiles);

    for (const file of validFiles) {
      const fileData: UploadedFile = { file, name: file.name };
      
      if (this.config.fileType === 'image') {
        try {
          fileData.preview = await createImagePreview(file);
        } catch (error) {
          this.errors.push(`Failed to create preview for ${file.name}`);
          continue;
        }
      }
      
      this.files.push(fileData);
    }

    this.updateValue();
  }

  private validateFiles(files: File[]): File[] {
    const validFiles: File[] = [];
    this.errors = [];

    for (const file of files) {
      if (!isValidFileType(file, this.config.accept)) {
        this.errors.push(`Invalid file type: ${file.name}`);
        continue;
      }
      
      if (!isValidFileSize(file, this.config.maxSize)) {
        this.errors.push(`File too large: ${file.name}`);
        continue;
      }

      if (this.files.length + validFiles.length >= this.maxFiles) {
        this.errors.push(`Maximum ${this.maxFiles} files allowed`);
        break;
      }

      validFiles.push(file);
    }

    return validFiles;
  }

  private updateValue() {
    this.onChange(this.files.map(f => f.file));
    this.onTouch();
  }
}