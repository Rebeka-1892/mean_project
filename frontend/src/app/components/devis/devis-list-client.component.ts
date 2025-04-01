import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevisService } from '../../services/devis.service';
import { CookieService } from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-devis-list',
  imports: [],
  templateUrl: './devis-list-client.component.html',
  standalone: true
})
export class DevisListClientComponent implements OnInit {
  deviss: any[] = [];

  constructor(
    private devisService: DevisService,
    private router: Router,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.loadDeviss();
  }

  loadDeviss(): void {
    const token = this.cookie.get('token');
    const decodedToken: any = jwtDecode(token);
    this.devisService.getDevisByIdclient(decodedToken.id).subscribe(data => this.deviss = data);
  }

  deleteDevis(id: string): void {
    this.devisService.deleteDevis(id).subscribe(() => this.loadDeviss());
  }

  updateDevis(id: string): void {
    this.router.navigate(['/devis-edit', id]);
  }

  goToDevisCreate() {
    this.router.navigate(['/devis-create']);
  }
}
