import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Custom validators for forms
 */
export class CustomValidators {
  static coordinates(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) return null;

    const lat = value.latitude;
    const lng = value.longitude;

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return { coordinates: 'Must be numbers' };
    }

    if (lat < -90 || lat > 90) {
      return { latitude: 'Must be between -90 and 90' };
    }

    if (lng < -180 || lng > 180) {
      return { longitude: 'Must be between -180 and 180' };
    }

    return null;
  }

  static futureDate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const date = new Date(control.value);
    
    if (date > new Date()) {
      return { futureDate: true };
    }

    return null;
  }

  static date(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(control.value)) {
      return { date: 'Invalid date format. Use YYYY-MM-DD' };
    }

    const date = new Date(control.value);
    if (isNaN(date.getTime())) {
      return { date: 'Invalid date' };
    }

    return null;
  }

  static time(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(control.value)) {
      return { time: 'Invalid time format. Use HH:mm (24-hour format)' };
    }

    return null;
  }

  static latitude(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const value = parseFloat(control.value);
    if (isNaN(value)) {
      return { latitude: 'Must be a number' };
    }

    if (value < -90 || value > 90) {
      return { latitude: 'Must be between -90 and 90' };
    }

    return null;
  }

  static longitude(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const value = parseFloat(control.value);
    if (isNaN(value)) {
      return { longitude: 'Must be a number' };
    }

    if (value < -180 || value > 180) {
      return { longitude: 'Must be between -180 and 180' };
    }

    return null;
  }
}