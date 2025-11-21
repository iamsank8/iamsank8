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
  }

  /**
   * Initialize Google Analytics
   */
  initializeAnalytics(measurementId: string): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    // Add Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false, // We'll handle page views manually
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
