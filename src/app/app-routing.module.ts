import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { EducationComponent } from './features/education/education.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ContactComponent } from './features/contact/contact.component';

/**
 * Application routes configuration
 * All components are now standalone components
 */
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'education', component: EducationComponent },
  { path: 'projects', component: ProjectsComponent },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog.component').then((m) => m.BlogComponent),
  },
  {
    path: 'code-quality',
    loadComponent: () =>
      import('./features/code-quality/code-quality.component').then((m) => m.CodeQualityComponent),
  },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
