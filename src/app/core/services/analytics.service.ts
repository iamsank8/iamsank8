import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly router = inject(Router);
  private initialized = false;

  constructor() {
    // Initialize data layer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };

    // Set default consent to 'denied' for privacy-by-design
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  }

  /**
   * Initialize Google Analytics
   */
  initializeAnalytics(measurementId: string): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    // Update consent to 'granted' since the user has explicitly accepted
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
    });

    // Add Google Analytics script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag with secure cookie flags
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false, // We'll handle page views manually
      cookie_flags: 'max-age=63072000;secure;samesite=lax',
    });

    // Track route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.trackPageView((event as NavigationEnd).urlAfterRedirects);
      });
  }

  /**
   * Track page view
   */
  trackPageView(path: string): void {
    if (!this.initialized) {
      return;
    }

    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
    });
  }

  /**
   * Track custom event
   */
  trackEvent(eventName: string, eventParams: Record<string, unknown> = {}): void {
    if (!this.initialized) {
      return;
    }

    window.gtag('event', eventName, eventParams);
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, unknown>): void {
    if (!this.initialized) {
      return;
    }

    window.gtag('set', 'user_properties', properties);
  }
}
