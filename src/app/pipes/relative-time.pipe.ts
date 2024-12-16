import { Pipe, PipeTransform } from '@angular/core';
import { formatRelativeTime } from '../utils/date.utils';

@Pipe({
  name: 'relativeTime',
  standalone: true
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date | string | number): string {
    const date = new Date(value);
    return formatRelativeTime(date);
  }
}