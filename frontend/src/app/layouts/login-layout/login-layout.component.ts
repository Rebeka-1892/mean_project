import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import BaseComponent from '../../components/BaseComponent';
import {SharedService} from '../../services/shared.service';

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

    constructor(private loginService: LoginService, private router: Router, private sharedService: SharedService) {
      super();
    }

    login(): void {
      this.loginService.login(this.utilisateur).subscribe(
        data => {
          this.sharedService.setUtilisateur(data);
          this.router.navigate(['/roles']);
        },
        error => {
          this.error = error.error.message;
        }
      );
    }
  }
