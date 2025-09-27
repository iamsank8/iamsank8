import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../core/material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService, BlogPost } from '../../../core/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogDetailComponent implements OnInit {
  blogPost: BlogPost | undefined;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadBlogPost(id);
      } else {
        this.router.navigate(['/blog']);
      }
    });
  }

  loadBlogPost(id: string): void {
    this.blogService.getBlogPost(id).subscribe({
      next: (post) => {
        this.blogPost = post;
        this.loading = false;
        
        if (!this.blogPost) {
          this.error = true;
        }
      },
      error: (err) => {
        console.error(`Error loading blog post with ID ${id}:`, err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  getFormattedDate(date: Date | string): string {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}