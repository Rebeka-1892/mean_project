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
  utilisateur: any = {nom: 'Solo', motdepasse: '1234'};
  returnUrl: string;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router) {
    super();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/factures-client';
  }

  login(): void {
    this.clientService.login(this.utilisateur).subscribe(
      () => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = error.error.message;
      }
    );
  }
}
