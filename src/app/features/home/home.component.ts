import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrimeNGModule } from '../../core/primeng.module';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, PrimeNGModule, RouterLink],
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Home',
      description:
        'Welcome to the portfolio of Sanket Thotange, a Senior Team Lead and Full Stack Developer.',
      keywords: [
        'Sanket Thotange',
        'Portfolio',
        'Full Stack Developer',
        'Angular',
        '.NET',
        'Azure',
      ],
    });
  }
}
