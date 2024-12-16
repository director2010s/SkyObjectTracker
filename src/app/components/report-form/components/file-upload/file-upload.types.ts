export interface FileUploadConfig {
  accept: string;
  maxSize: number;
  fileType: 'image' | 'video';
}

export interface UploadedFile {
  file: File;
  preview?: string;
  name: string;
}

export interface FileTypeInfo {
  extensions: string[];
  maxSize: number;
}