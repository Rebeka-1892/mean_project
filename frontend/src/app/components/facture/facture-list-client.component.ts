import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactureService } from '../../services/facture.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-facture-list',
  imports: [],
  templateUrl: './facture-list-client.component.html',
  standalone: true
})
export class FactureListClientComponent implements OnInit {
  factures: any[] = [];
  
  constructor(
    private factureService: FactureService, 
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFactures();
  }

  loadFactures(): void {    
    const token = this.cookie.get('token');
    const decodedToken: any = jwtDecode(token);
    this.factureService.getFactureByIdclient(decodedToken.id).subscribe(data => this.factures =
      data);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // deleteFacture(id: string): void {
  //   this.factureService.deleteFacture(id).subscribe(() => this.loadFactures());
  // }

  // updateFacture(id: string): void {
  //   this.router.navigate(['/factures-edit', id]);
  // }

  // goToFactureCreate() {
  //   this.router.navigate(['/factures-create']);
  // }
}
