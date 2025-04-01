import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import BaseComponent from '../../components/BaseComponent';
import {ClientService} from '../../services/client.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sign-up-layout',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './sign-up-layout.component.html',
  standalone: true,
  styleUrl: './sign-up-layout.component.css'
})
export class SignUpLayoutComponent extends BaseComponent {
  utilisateur: any = {};
  returnUrl: string;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router) {
    super();
    this.returnUrl = '/sign-in';
  }

  register(): void {
    this.clientService.register(this.utilisateur).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = error.error.message;
      }
    );
  }
}
