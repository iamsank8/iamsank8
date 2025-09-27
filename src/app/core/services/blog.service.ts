import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishDate: Date | string;
  tags: string[];
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/blog`;
  
  // Mock data for development
  private mockBlogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Getting Started with Angular 17',
      summary: 'Learn about the new features in Angular 17 and how to upgrade your application.',
      content: `
        <p>Angular 17 introduces several exciting new features and improvements that make developing applications even more enjoyable and productive.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>Improved performance with the new Ivy rendering engine</li>
          <li>Standalone components by default</li>
          <li>New control flow syntax</li>
          <li>Simplified bootstrapping process</li>
          <li>Better developer experience</li>
        </ul>
        
        <h3>Upgrading to Angular 17</h3>
        <p>To upgrade your application to Angular 17, follow these steps:</p>
        <ol>
          <li>Update your Node.js version to at least 18.13.0</li>
          <li>Run <code>ng update @angular/core @angular/cli</code></li>
          <li>Update your dependencies</li>
          <li>Test your application thoroughly</li>
        </ol>
        
        <p>The Angular team has made significant improvements to the framework, making it faster, more efficient, and easier to use.</p>
      `,
      author: 'Sanket Thotange',
      publishDate: new Date('2025-09-15'),
      tags: ['Angular', 'Web Development', 'Frontend']
    },
    {
      id: '2',
      title: 'Building Secure Angular Applications',
      summary: 'Learn best practices for securing your Angular applications against common web vulnerabilities.',
      content: `
        <p>Security is a critical aspect of web application development. Angular provides several built-in protections, but developers need to be aware of best practices to ensure their applications remain secure.</p>
        
        <h3>Common Security Vulnerabilities</h3>
        <ul>
          <li>Cross-Site Scripting (XSS)</li>
          <li>Cross-Site Request Forgery (CSRF)</li>
          <li>Injection attacks</li>
          <li>Broken authentication</li>
        </ul>
        
        <h3>Angular Security Best Practices</h3>
        <ol>
          <li>Use Angular's built-in sanitization for dynamic content</li>
          <li>Implement proper Content Security Policy (CSP)</li>
          <li>Use HttpClient for all HTTP requests</li>
          <li>Implement proper authentication and authorization</li>
          <li>Keep dependencies updated</li>
          <li>Use HTTPS for all communications</li>
        </ol>
        
        <p>By following these best practices, you can significantly reduce the risk of security vulnerabilities in your Angular applications.</p>
      `,
      author: 'Sanket Thotange',
      publishDate: new Date('2025-08-28'),
      tags: ['Security', 'Angular', 'Web Development']
    }
  ];

  constructor(private http: HttpClient) { }

  /**
   * Get all blog posts
   */
  getBlogPosts(): Observable<BlogPost[]> {
    // In production, use the API
    if (environment.production) {
      return this.http.get<BlogPost[]>(this.apiUrl).pipe(
        map(posts => this.processBlogPosts(posts)),
        catchError(error => {
          console.error('Error fetching blog posts:', error);
          return of(this.mockBlogPosts);
        })
      );
    }
    
    // In development, use mock data
    return of(this.mockBlogPosts);
  }

  /**
   * Get a specific blog post by ID
   */
  getBlogPost(id: string): Observable<BlogPost | undefined> {
    // In production, use the API
    if (environment.production) {
      return this.http.get<BlogPost>(`${this.apiUrl}/${id}`).pipe(
        map(post => this.processBlogPost(post)),
        catchError(error => {
          console.error(`Error fetching blog post with ID ${id}:`, error);
          const mockPost = this.mockBlogPosts.find(post => post.id === id);
          return of(mockPost);
        })
      );
    }
    
    // In development, use mock data
    const mockPost = this.mockBlogPosts.find(post => post.id === id);
    return of(mockPost);
  }

  /**
   * Process blog posts from API to ensure dates are Date objects
   */
  private processBlogPosts(posts: BlogPost[]): BlogPost[] {
    return posts.map(post => this.processBlogPost(post));
  }

  /**
   * Process a single blog post from API
   */
  private processBlogPost(post: BlogPost): BlogPost {
    return {
      ...post,
      publishDate: post.publishDate instanceof Date ? post.publishDate : new Date(post.publishDate)
    };
  }
}