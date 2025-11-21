import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimeNGModule } from '../../core/primeng.module';
import {
  AboutService,
  AboutData,
  PersonalInfo,
  Stats,
  ProfessionalSummaryItem,
  Certification,
} from '../../core/services/about.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [CommonModule, PrimeNGModule, RouterModule],
})
export class AboutComponent implements OnInit {
  private readonly aboutService = inject(AboutService);
  private readonly seoService = inject(SeoService);

  aboutData: AboutData | null = null;
  personalInfo: PersonalInfo | null = null;
  stats: Stats | null = null;
  mission = '';
  professionalSummary: ProfessionalSummaryItem[] = [];
  certifications: Certification[] = [];
  loading = true;
  error = false;

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'About Me',
      description:
        'Learn more about Sanket Thotange, a passionate Full Stack Developer with over 9 years of experience.',
      keywords: ['About', 'Biography', 'Experience', 'Certifications'],
    });
    this.loadAboutData();
  }

  private loadAboutData(): void {
    this.aboutService.getAboutData().subscribe({
      next: (data) => {
        if (data) {
          this.aboutData = data;
          this.personalInfo = data.personalInfo;
          this.stats = data.stats;
          this.mission = data.mission;
          this.professionalSummary = data.professionalSummary;
          this.certifications = data.certifications;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading about data:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }
}
