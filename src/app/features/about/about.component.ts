import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimeNGModule } from '../../core/primeng.module';
import { AboutService, AboutData, PersonalInfo, Stats, ProfessionalSummaryItem, Certification } from '../../core/services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [CommonModule, PrimeNGModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutComponent implements OnInit {
  aboutData: AboutData | null = null;
  personalInfo: PersonalInfo | null = null;
  stats: Stats | null = null;
  mission: string = '';
  professionalSummary: ProfessionalSummaryItem[] = [];
  certifications: Certification[] = [];
  loading = true;
  error = false;

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.loadAboutData();
  }

  private loadAboutData(): void {
    this.aboutService.getAboutData().subscribe({
      next: (data) => {
        this.aboutData = data;
        this.personalInfo = data.personalInfo;
        this.stats = data.stats;
        this.mission = data.mission;
        this.professionalSummary = data.professionalSummary;
        this.certifications = data.certifications;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading about data:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }
}