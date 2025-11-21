import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from './core/services/security.service';
import { ThemeService } from './core/services/theme.service';
import { AnalyticsService } from './core/services/analytics.service';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, CoreModule, FeaturesModule, HeaderComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly securityService = inject(SecurityService);
  private readonly themeService = inject(ThemeService);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  title = 'Sanket Thotange - Portfolio';
  private themeSubscription!: Subscription;

  ngOnInit(): void {
    // Initialize security features
    this.securityService.initializeSecurity();

    // Initialize analytics in production mode
    if (environment.production) {
      this.analyticsService.initializeAnalytics(environment.analyticsId);
    }

    // Set page title and meta tags
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {
        name: 'description',
        content:
          'Professional portfolio of Sanket Thotange, showcasing skills, projects, and experience in software development.',
      },
      {
        name: 'keywords',
        content: 'Angular, TypeScript, Software Development, Portfolio, Sanket Thotange',
      },
      { name: 'author', content: 'Sanket Thotange' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' },
    ]);

    // Subscribe to theme changes
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe((isDark) => {
      // Apply theme class to body element
      if (isDark) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
