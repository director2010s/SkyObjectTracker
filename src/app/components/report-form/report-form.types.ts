export interface ReportFormState {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}

export interface MediaFile {
  file: File;
  preview: string;
}