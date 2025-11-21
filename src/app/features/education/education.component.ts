import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '../../core/primeng.module';
import { EducationService, Education, Certification } from '../../core/services/education.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  standalone: true,
  imports: [CommonModule, PrimeNGModule],
})
export class EducationComponent implements OnInit {
  private readonly educationService = inject(EducationService);
  private readonly seoService = inject(SeoService);

  educations: Education[] = [];
  certifications: Certification[] = [];
  loading = true;
  error = false;

  displayedColumns: string[] = ['degree', 'year', 'institution', 'board', 'percentage'];

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Education',
      description: 'Educational background and certifications of Sanket Thotange.',
      keywords: ['Education', 'Degree', 'Certifications', 'University'],
    });
    this.loadEducationData();
    this.loadCertifications();
  }

  private loadEducationData(): void {
    this.educationService.getEducations().subscribe({
      next: (data) => {
        this.educations = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading education data:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }

  private loadCertifications(): void {
    this.educationService.getCertifications().subscribe({
      next: (data) => {
        this.certifications = data;
      },
      error: (error) => {
        console.error('Error loading certifications:', error);
      },
    });
  }
}
