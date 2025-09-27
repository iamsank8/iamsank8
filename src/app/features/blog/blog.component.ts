import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../core/material.module';
import { RouterModule } from '@angular/router';
import { BlogService, BlogPost } from '../../core/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  loading = true;
  error = false;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {
    this.blogService.getBlogPosts().subscribe({
      next: (posts) => {
        this.blogPosts = posts;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading blog posts:', err);
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