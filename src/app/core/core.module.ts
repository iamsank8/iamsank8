import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [MaterialModule],
  providers: [],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}
