import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private readonly meta = inject(Meta);

  /**
   * Initialize security headers and policies
   */
  initializeSecurity(): void {
    this.setupContentSecurityPolicy();
  }

  /**
   * Set up Content Security Policy
   */
  private setupContentSecurityPolicy(): void {
    // Add CSP meta tag (using httpEquiv for browser recognition)
    this.meta.addTag({
      httpEquiv: 'Content-Security-Policy',
      content: this.buildCSPPolicy(),
    });
  }

  /**
   * Build the Content Security Policy string
   */
  private buildCSPPolicy(): string {
    const apiUrl = environment.apiUrl;

    const scriptSrc = environment.production
      ? "script-src 'self' https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com"
      : "script-src 'self' 'unsafe-eval' https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com";

    const policies = [
      // Default policy for all content types
      "default-src 'self'",

      // Script sources
      scriptSrc,

      // Style sources - unsafe-inline needed for PrimeNG
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com",

      // Font sources
      "font-src 'self' https://fonts.gstatic.com",

      // Image sources
      "img-src 'self' data: https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com https://storage.googleapis.com",

      // Connect sources (APIs, WebSockets)
      `connect-src 'self' ${apiUrl} https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net`,

      // Frame sources
      "frame-src 'none'",

      // Object sources
      "object-src 'none'",

      // Media sources
      "media-src 'self'",

      // Worker sources
      "worker-src 'self'",

      // Manifest sources
      "manifest-src 'self'",
    ];

    return policies.join('; ');
  }
}
