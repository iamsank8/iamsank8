import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { routes } from './app/app-routing.module';
import { SecurityService } from './app/core/services/security.service';
import { ThemeService } from './app/core/services/theme.service';
import { AnalyticsService } from './app/core/services/analytics.service';
import { CoreModule } from './app/core/core.module';
import { FeaturesModule } from './app/features/features.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    SecurityService,
    ThemeService,
    AnalyticsService,
    importProvidersFrom(CoreModule, FeaturesModule),
  ],
}).catch((err) => console.error(err));
