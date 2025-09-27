import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { ThemeService } from './services/theme.service';
import { SecurityService } from './services/security.service';
import { AnalyticsService } from './services/analytics.service';

/**
 * Core module providing application-wide services and components.
 * This module is being migrated to standalone components.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    ThemeService,
    SecurityService,
    AnalyticsService
  ],
  declarations: [],
  exports: [
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {
  // Static method to use in standalone component bootstrapping
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        ThemeService,
        SecurityService,
        AnalyticsService
      ]
    };
  }
}
