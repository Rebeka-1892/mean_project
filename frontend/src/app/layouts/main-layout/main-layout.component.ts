import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import BaseComponent from '../../components/BaseComponent';
import {LoginService} from '../../services/login.service';
import {SharedService} from '../../services/shared.service';

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
  utilisateur: any = {};

  constructor(private loginService: LoginService, private router: Router, private sharedService: SharedService) {
    super();
    this.utilisateur = sharedService.getUtilisateur();
  }

  logout(): void {
    this.loginService.logout().subscribe(
      data => {
        this.sharedService.clearUtilisateur();
        this.router.navigate(['/login']);
      },
      error => {
        this.error = error.error.message;
      }
    );
  }
}
