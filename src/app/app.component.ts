import { Component, OnInit } from '@angular/core';
import { SecurityService } from './core/services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'iamsank8';

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    // Initialize security features
    this.securityService.initializeSecurity();
  }
}
