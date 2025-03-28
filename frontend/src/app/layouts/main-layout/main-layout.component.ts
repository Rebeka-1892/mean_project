import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import BaseComponent from '../../components/BaseComponent';
import {LoginService} from '../../services/login.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet
  ],
  templateUrl: './main-layout.component.html',
  standalone: true,
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent extends BaseComponent {
  constructor(private loginService: LoginService, private router: Router) {
    super();
  }

  logout(): void {
    this.loginService.logout().subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      error => {
        this.error = error.error.message;
      }
    );
  }
}
