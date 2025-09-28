import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '../../core/primeng.module';
import { EducationService, Education, Certification } from '../../core/services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  standalone: true,
  imports: [CommonModule, PrimeNGModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EducationComponent implements OnInit {
  educations: Education[] = [];
  certifications: Certification[] = [];
  loading = true;
  error = false;

  displayedColumns: string[] = ['degree', 'year', 'institution', 'board', 'percentage'];

  constructor(private educationService: EducationService) { }

  ngOnInit(): void {
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
      }
    });
  }

  private loadCertifications(): void {
    this.educationService.getCertifications().subscribe({
      next: (data) => {
        this.certifications = data;
      },
      error: (error) => {
        console.error('Error loading certifications:', error);
      }
    });
  }
}