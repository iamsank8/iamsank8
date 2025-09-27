import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service for managing application theme (dark/light)
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private isDarkThemeSubject = new BehaviorSubject<boolean>(false);
  private readonly THEME_KEY = 'portfolio-theme-preference';

  /**
   * Observable to track current theme state
   */
  public isDarkTheme$: Observable<boolean> = this.isDarkThemeSubject.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  /**
   * Initialize theme based on saved preference or system preference
   */
  private initializeTheme(): void {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    
    if (savedTheme) {
      // Use saved preference
      this.setTheme(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark);
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.THEME_KEY)) {
          this.setTheme(e.matches);
        }
      });
    }
  }

  /**
   * Toggle between dark and light theme
   */
  public toggleTheme(): void {
    const newThemeValue = !this.isDarkThemeSubject.value;
    this.setTheme(newThemeValue);
    
    // Save preference
    localStorage.setItem(this.THEME_KEY, newThemeValue ? 'dark' : 'light');
  }

  /**
   * Set specific theme
   * @param isDark Whether to set dark theme (true) or light theme (false)
   */
  public setTheme(isDark: boolean): void {
    this.isDarkThemeSubject.next(isDark);
    
    if (isDark) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  /**
   * Get current theme value
   * @returns boolean indicating if dark theme is active
   */
  public isDarkTheme(): boolean {
    return this.isDarkThemeSubject.value;
  }
}