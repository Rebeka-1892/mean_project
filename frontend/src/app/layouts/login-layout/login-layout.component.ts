import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import BaseComponent from '../../components/BaseComponent';
import {CookieService} from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';

  @Component({
    selector: 'app-login',
    templateUrl: './login-layout.component.html',
    imports: [
      FormsModule,
      NgIf
    ],
    standalone: true,
    styleUrl: './login-layout.component.css'
  })
  export class LoginComponent extends BaseComponent {
    utilisateur: any = {nom: 'admin', motdepasse: '1234'};
    returnUrl: string;

    constructor(private loginService: LoginService, private cookieService: CookieService, private route: ActivatedRoute, private router: Router) {
      super();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    }

    login(): void {
      this.loginService.login(this.utilisateur).subscribe(
        (data) => {
          this.cookieService.set('token', data);
          const decodedToken: any = jwtDecode(data);
          const url = decodedToken.role === 'manager' ? '/dashboard' : '/taches';
          this.router.navigate([this.returnUrl ?? url]);
        },
        error => {
          this.error = error.error.message;
        }
      );
    }
  }
