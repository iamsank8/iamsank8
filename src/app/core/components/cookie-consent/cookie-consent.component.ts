import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AnalyticsService } from '../../services/analytics.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent implements OnInit {
  private readonly analyticsService = inject(AnalyticsService);

  showBanner = false;
  showBadge = false;

  ngOnInit(): void {
    const consent = localStorage.getItem('cookie-consent');

    if (!consent) {
      // User hasn't decided yet
      this.showBanner = true;
      this.showBadge = false;
    } else {
      // User already decided
      this.showBanner = false;
      this.showBadge = true;

      // If they previously granted consent, initialize analytics
      if (consent === 'granted' && environment.production) {
        this.analyticsService.initializeAnalytics(environment.analyticsId);
      }
    }
  }

  /**
   * Accept all cookies and enable analytics
   */
  acceptAll(): void {
    localStorage.setItem('cookie-consent', 'granted');
    this.showBanner = false;
    this.showBadge = true;

    if (environment.production) {
      this.analyticsService.initializeAnalytics(environment.analyticsId);
    }
  }

  /**
   * Decline all optional cookies
   */
  decline(): void {
    localStorage.setItem('cookie-consent', 'denied');
    this.showBanner = false;
    this.showBadge = true;
  }

  /**
   * Open the consent settings banner again
   */
  openBanner(): void {
    this.showBanner = true;
    this.showBadge = false;
  }
}
