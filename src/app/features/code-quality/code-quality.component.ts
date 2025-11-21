import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '../../core/primeng.module';
import { QualityService } from '../../core/services/quality.service';
import { QualityReport } from '../../core/models/quality-report.model';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-code-quality',
  templateUrl: './code-quality.component.html',
  styleUrls: ['./code-quality.component.scss'],
  standalone: true,
  imports: [CommonModule, PrimeNGModule],
})
export class CodeQualityComponent implements OnInit {
  private readonly qualityService = inject(QualityService);
  private readonly seoService = inject(SeoService);

  report: QualityReport | null = null;
  loading = true;
  error = false;

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Code Quality & Engineering Practices',
      description:
        'Explore the engineering practices, testing coverage, and code quality metrics of this portfolio project.',
      keywords: ['Code Quality', 'Testing', 'ESLint', 'Cypress', 'Unit Tests', 'E2E Tests'],
    });

    this.loadQualityReport();
  }

  private loadQualityReport(): void {
    this.qualityService.getQualityReport().subscribe({
      next: (data) => {
        this.report = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading quality report:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }

  getStatusColor(status: string): string {
    return this.qualityService.getStatusColor(status);
  }

  getCoverageColor(percentage: number): string {
    return this.qualityService.getCoverageColor(percentage);
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'passing':
        return 'pi-check-circle';
      case 'failing':
        return 'pi-times-circle';
      case 'configured':
        return 'pi-cog';
      default:
        return 'pi-question-circle';
    }
  }
}
