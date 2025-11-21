import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimeNGModule } from '../../primeng.module';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, PrimeNGModule, ThemeToggleComponent],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly themeService = inject(ThemeService);
  isDarkTheme = false;
  isMobileMenuOpen = false;
  private themeSubscription!: Subscription;

  ngOnInit(): void {
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe((isDark) => {
      this.isDarkTheme = isDark;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevent body scroll when mobile menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}
