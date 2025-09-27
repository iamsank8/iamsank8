import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';

/**
 * This module is kept for backward compatibility during the migration to standalone components.
 * It will be removed once all components are migrated to standalone.
 */
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FeaturesModule,
    AppRoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
