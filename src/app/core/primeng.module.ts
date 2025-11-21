import { NgModule } from '@angular/core';

// PrimeNG Modules - Only importing what's actually used
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { TimelineModule } from 'primeng/timeline';
import { TableModule } from 'primeng/table';

@NgModule({
  exports: [
    // Form Components
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    MultiSelectModule,

    // Layout Components
    CardModule,

    // Data Display Components
    TableModule,
    TimelineModule,

    // Feedback Components
    ProgressSpinnerModule,
    ToastModule,

    // Overlay Components
    TooltipModule,
  ],
})
export class PrimeNGModule {}
