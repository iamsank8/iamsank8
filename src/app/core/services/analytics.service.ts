import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { filter } from 'rxjs/operators';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private initialized = false;

  constructor(private router: Router) {
    // Initialize data layer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
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
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.trackPageView(event.urlAfterRedirects);
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
  trackEvent(eventName: string, eventParams: Record<string, any> = {}): void {
    if (!this.initialized) {
      return;
    }

    window.gtag('event', eventName, eventParams);
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, any>): void {
    if (!this.initialized) {
      return;
    }

    window.gtag('set', 'user_properties', properties);
  }
}