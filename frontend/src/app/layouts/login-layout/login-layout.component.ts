import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import BaseComponent from '../../components/BaseComponent';

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
    utilisateur: any = {};
    returnUrl: string;

    constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
      super();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/roles';
    }

    login(): void {
      this.loginService.login(this.utilisateur).subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error.error.message;
        }
      );
    }
  }
