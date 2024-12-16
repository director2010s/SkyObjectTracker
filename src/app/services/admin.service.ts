import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  approveReport(reportId: string): Observable<void> {
    // TODO: Implement actual API call
    console.log('Approving report:', reportId);
    return of(void 0).pipe(delay(500));
  }

  flagReport(reportId: string): Observable<void> {
    // TODO: Implement actual API call
    console.log('Flagging report:', reportId);
    return of(void 0).pipe(delay(500));
  }

  deleteReport(reportId: string): Observable<void> {
    // TODO: Implement actual API call
    console.log('Deleting report:', reportId);
    return of(void 0).pipe(delay(500));
  }
}