import { FileTypeInfo } from './file-upload.types';

export function getFileTypeInfo(fileType: 'image' | 'video', maxSize: number): FileTypeInfo {
  if (fileType === 'image') {
    return {
      extensions: ['PNG', 'JPG', 'GIF'],
      maxSize
    };
  }
  
  return {
    extensions: ['MP4', 'WebM'],
    maxSize
  };
}

export function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e: any) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error('Failed to read file'));
    
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
}

export function isValidFileType(file: File, accept: string): boolean {
  return accept.split(',').some(type => {
    return file.type.match(type.trim().replace('*', '.*')) !== null;
  });
}

export function isValidFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize * 1024 * 1024; // Convert MB to bytes
}