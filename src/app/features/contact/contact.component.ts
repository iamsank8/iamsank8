import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PrimeNGModule } from '../../core/primeng.module';
import { ContactService } from '../../core/services/contact.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [CommonModule, PrimeNGModule, ReactiveFormsModule],
  providers: [MessageService],
})
export class ContactComponent implements OnInit {
  private readonly fb = inject(UntypedFormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly messageService = inject(MessageService);
  private readonly seoService = inject(SeoService);

  contactForm!: UntypedFormGroup;
  submitted = false;
  loading = false;

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Contact',
      description:
        'Get in touch with Sanket Thotange for freelance opportunities, job offers, or collaboration.',
      keywords: ['Contact', 'Hire Me', 'Freelance', 'Collaboration'],
    });
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;

    this.contactService.sendContactForm(this.contactForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Message sent successfully!',
          life: 3000,
        });
        this.contactForm.reset();
        this.submitted = false;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to send message. Please try again later.',
          life: 3000,
        });
        this.loading = false;
      },
    });
  }
}
