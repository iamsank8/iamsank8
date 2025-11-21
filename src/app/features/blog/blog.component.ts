import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Blog',
      description:
        'Insights, tutorials, and thoughts on software development, architecture, and technology.',
      keywords: ['Blog', 'Software Development', 'Angular', 'Tech', 'Tutorials'],
    });
  }
}
