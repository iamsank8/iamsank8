import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  /**
   * Simulates sending contact form data to a backend service
   * In a real application, this would make an HTTP request to a backend API
   */
  sendContactForm(formData: ContactFormData): Observable<boolean> {
    console.log('Contact form data:', formData);
    
    // Simulate API call with delay
    return of(true).pipe(
      delay(1000)
    );
  }
}