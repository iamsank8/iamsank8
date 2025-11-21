import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '../../primeng.module';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  standalone: true,
  imports: [CommonModule, PrimeNGModule],
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);
  isDarkTheme$: Observable<boolean> = this.themeService.isDarkTheme$;



  /**
   * Toggle between light and dark theme
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
