import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/header/header.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { ThemeService } from './services/theme.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [ThemeService],
  declarations: [
    HeaderComponent,
    ThemeToggleComponent
  ],
  exports: [
    HeaderComponent,
    ThemeToggleComponent,
    MaterialModule
  ],
})
export class CoreModule {}
