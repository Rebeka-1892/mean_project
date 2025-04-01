import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import BaseComponent from '../../components/BaseComponent';
import {ClientService} from '../../services/client.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sign-in-layout',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './sign-in-layout.component.html',
  standalone: true,
  styleUrl: './sign-in-layout.component.css'
})
export class SignInLayoutComponent extends BaseComponent {
  utilisateur: any = {};
  returnUrl: string;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router) {
    super();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/roles';
  }

  login(): void {
    this.clientService.login(this.utilisateur).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = error.error.message;
      }
    );
  }
}
