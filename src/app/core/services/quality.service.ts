import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QualityReport } from '../models/quality-report.model';

@Injectable({
  providedIn: 'root',
})
export class QualityService {
  private readonly http = inject(HttpClient);
  private reportUrl = 'assets/quality-report.json';

  getQualityReport(): Observable<QualityReport | null> {
    return this.http.get<QualityReport>(this.reportUrl).pipe(
      catchError((error) => {
        console.error('Error loading quality report:', error);
        return of(null);
      })
    );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'passing':
        return 'var(--success)';
      case 'failing':
        return 'var(--error)';
      case 'configured':
        return 'var(--info)';
      default:
        return 'var(--text-secondary)';
    }
  }

  getCoverageColor(percentage: number): string {
    if (percentage >= 80) return 'var(--success)';
    if (percentage >= 60) return 'var(--warning)';
    return 'var(--error)';
  }
}
