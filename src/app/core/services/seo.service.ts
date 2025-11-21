import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

export interface SeoConfig {
    title: string;
    description: string;
    image?: string;
    slug?: string;
    keywords?: string[];
}

@Injectable({
    providedIn: 'root',
})
export class SeoService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;
    private readonly title = inject(Title);
    private readonly meta = inject(Meta);

    private readonly defaultTitle = 'Iamsank8 - Portfolio';
    private readonly defaultDescription =
        'Personal portfolio of Sanket Thotange, showcasing projects, skills, and experience.';
    private readonly defaultImage = 'assets/images/profile-pic.jpg'; // Ensure this image exists or use a placeholder
    private readonly siteUrl = 'https://iamsank8.web.app'; // Or your custom domain

    generateTags(config: SeoConfig): void {
        const title = config.title ? `${config.title} | Iamsank8` : this.defaultTitle;
        const description = config.description || this.defaultDescription;
        const image = config.image || this.defaultImage;
        const url = config.slug ? `${this.siteUrl}/${config.slug}` : this.siteUrl;

        // Set Title
        this.title.setTitle(title);

        // Set Meta Tags
        this.meta.updateTag({ name: 'description', content: description });
        if (config.keywords && config.keywords.length > 0) {
            this.meta.updateTag({ name: 'keywords', content: config.keywords.join(', ') });
        }

        // Open Graph (Facebook/LinkedIn)
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: image });

        // Twitter Card
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: image });
    }

    /**
     * Fetch SEO data from backend API.
     */
    getSeoData() {
        return this.http.get<SeoConfig>(`${this.apiUrl}/seo`);
    }
}
