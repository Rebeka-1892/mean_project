import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeService } from '../../services/demande.service';

@Component({
  selector: 'app-demande-list',
  imports: [],
  templateUrl: './demande-list.component.html',
  standalone: true
})
export class DemandeListComponent implements OnInit {
  demandes: any[] = [];

  constructor(
    private demandeService: DemandeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    this.demandeService.getDemandes().subscribe(data => this.demandes =
      data);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  deleteDemande(id: string): void {
    this.demandeService.deleteDemande(id).subscribe(() => this.loadDemandes());
  }

  updateDemande(id: string): void {
    this.router.navigate(['/demandes-edit', id]);
  }

  createDevis(iddemande: string, idclient: string){
    this.router.navigate(['/devis-create', iddemande, idclient]);
  }

  goToDemandeCreate() {
    this.router.navigate(['/demandes-create']);
  }
}
