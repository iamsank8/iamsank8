import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule, ThemeToggleComponent]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDarkTheme = false;
  private themeSubscription!: Subscription;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe(isDark => {
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
}
