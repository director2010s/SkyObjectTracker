import { FormGroup } from '@angular/forms';
import { ObjectType } from '../../../models/sky-object.model';

export interface ReportFormState {
  form: FormGroup;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}

export interface MediaFile {
  file: File;
  preview: string;
}

export interface LocationData {
  street: string;
  city: string;
  region: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface ReportFormData {
  name: string;
  objectType: ObjectType;
  description: string;
  location: LocationData;
  dateTime: Date;
  media: {
    images: File[];
    videos: File[];
  };
}