import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class ThemeToggleComponent implements OnInit {
  isDarkTheme$: Observable<boolean>;

  constructor(private themeService: ThemeService) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }

  ngOnInit(): void {
  }

  /**
   * Toggle between light and dark theme
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}