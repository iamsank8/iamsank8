import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private meta: Meta) { }

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
    // Add CSP meta tag
    this.meta.addTag({
      name: 'Content-Security-Policy',
      content: this.buildCSPPolicy()
    });
  }

  /**
   * Build the Content Security Policy string
   */
  private buildCSPPolicy(): string {
    const policies = [
      // Default policy for all content types
      "default-src 'self'",
      
      // Script sources
      "script-src 'self' https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com",
      
      // Style sources
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      
      // Font sources
      "font-src 'self' https://fonts.gstatic.com",
      
      // Image sources
      "img-src 'self' data: https://www.google-analytics.com",
      
      // Connect sources (APIs, WebSockets)
      "connect-src 'self' https://us-central1-portfolio-sanket-c5165.cloudfunctions.net",
      
      // Frame sources
      "frame-src 'none'",
      
      // Object sources
      "object-src 'none'",
      
      // Media sources
      "media-src 'self'"
    ];

    return policies.join('; ');
  }
}