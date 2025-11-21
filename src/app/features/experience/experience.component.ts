import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '../../core/primeng.module';
import { TimelineModule } from 'primeng/timeline';
import { ExperienceService, WorkExperience } from '../../core/services/experience.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  standalone: true,
  imports: [CommonModule, PrimeNGModule, TimelineModule],
})
export class ExperienceComponent implements OnInit {
  private readonly experienceService = inject(ExperienceService);
  private readonly seoService = inject(SeoService);

  workExperiences: WorkExperience[] = [];
  loading = true;
  error = false;

  // Computed properties for template
  totalExperience = 0;
  uniqueCompanies = 0;
  uniqueDomains: string[] = [];
  topSkills: string[] = [];

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Experience',
      description:
        'Professional work experience of Sanket Thotange, detailing roles, responsibilities, and achievements.',
      keywords: ['Experience', 'Work History', 'Career', 'Resume'],
    });
    this.loadExperiences();
  }

  private loadExperiences(): void {
    this.loading = true;
    this.experienceService.getExperiences().subscribe({
      next: (experiences) => {
        this.workExperiences = experiences;
        this.computeStats();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading experiences:', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  private computeStats(): void {
    // Compute total experience
    this.totalExperience = this.experienceService.getTotalExperience();

    // Compute unique companies
    const companies = new Set(this.workExperiences.map((exp) => exp.company));
    this.uniqueCompanies = companies.size;

    // Compute unique domains
    const domains = new Set<string>();
    this.workExperiences.forEach((exp) => {
      exp.domains.forEach((domain) => domains.add(domain));
    });
    this.uniqueDomains = Array.from(domains);

    // Compute top skills
    const skillCount = new Map<string, number>();
    this.workExperiences.forEach((exp) => {
      exp.skillsGained.forEach((skill) => {
        skillCount.set(skill, (skillCount.get(skill) || 0) + 1);
      });
    });

    this.topSkills = Array.from(skillCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map((entry) => entry[0]);
  }

  // Getter methods for template
  getTotalExperience(): number {
    return this.totalExperience;
  }

  getUniqueCompanies(): number {
    return this.uniqueCompanies;
  }

  getUniqueDomains(): string[] {
    return this.uniqueDomains;
  }

  getTopSkills(): string[] {
    return this.topSkills;
  }

  getYearFromPeriod(period: string): string {
    // Extract the start year from period string like "March 2020 - Present"
    const match = period.match(/(\d{4})/);
    return match ? match[1] : '';
  }

  // TrackBy function for performance
  trackByExperience(index: number, experience: WorkExperience): string {
    return `${experience.company}-${experience.position}-${experience.period}`;
  }
}
