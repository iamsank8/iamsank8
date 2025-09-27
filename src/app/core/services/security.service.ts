import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

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
    this.setupSecurityHeaders();
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
   * Set up additional security headers
   */
  private setupSecurityHeaders(): void {
    // X-Content-Type-Options
    this.meta.addTag({
      name: 'X-Content-Type-Options',
      content: 'nosniff'
    });

    // X-Frame-Options
    this.meta.addTag({
      name: 'X-Frame-Options',
      content: 'DENY'
    });

    // X-XSS-Protection
    this.meta.addTag({
      name: 'X-XSS-Protection',
      content: '1; mode=block'
    });

    // Referrer-Policy
    this.meta.addTag({
      name: 'Referrer-Policy',
      content: 'strict-origin-when-cross-origin'
    });

    // Permissions-Policy
    this.meta.addTag({
      name: 'Permissions-Policy',
      content: 'camera=(), microphone=(), geolocation=()'
    });
  }

  /**
   * Build the Content Security Policy string
   */
  private buildCSPPolicy(): string {
    const apiUrl = environment.apiUrl;
    
    const policies = [
      // Default policy for all content types
      "default-src 'self'",
      
      // Script sources
      "script-src 'self' https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com",
      
      // Style sources - unsafe-inline needed for Angular Material
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
      "manifest-src 'self'"
    ];

    return policies.join('; ');
  }
}