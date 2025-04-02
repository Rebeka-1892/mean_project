import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactureService } from '../../services/facture.service';

@Component({
  selector: 'app-facture-list',
  imports: [],
  templateUrl: './facture-list.component.html',
  standalone: true
})
export class FactureListComponent implements OnInit {
  factures: any[] = [];
  
  constructor(
    private factureService: FactureService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFactures();
  }

  loadFactures(): void {
    this.factureService.getFactures().subscribe(data => this.factures =
      data);
  }

  deleteFacture(id: string): void {
    this.factureService.deleteFacture(id).subscribe(() => this.loadFactures());
  }

  updateFacture(id: string): void {
    this.router.navigate(['/factures-edit', id]);
  }

  goToFactureCreate() {
    this.router.navigate(['/factures-create']);
  }
}
