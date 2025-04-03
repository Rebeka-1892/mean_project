import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevisService } from '../../services/devis.service';
import { ServiceService } from '../../services/service.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { FactureService } from '../../services/facture.service';
import { DetaildevisService } from '../../services/detaildevis.service';
import { FormulematerielService } from '../../services/formulemateriel.service';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-devis-list',
  imports: [],
  templateUrl: './devis-list-client.component.html',
  standalone: true
})
export class DevisListClientComponent implements OnInit {
  deviss: any[] = [];

  constructor(
    private formulematerielService: FormulematerielService,
    private stockService: StockService,
    private devisService: DevisService,
    private serviceService: ServiceService,
    private factureService: FactureService,
    private detaildevisService: DetaildevisService,
    private router: Router,
    private cookie: CookieService
  ) {
  }

  ngOnInit(): void {
    this.loadDeviss();
  }

  loadDeviss(): void {
    const token = this.cookie.get('token');
    const decodedToken: any = jwtDecode(token);
    this.devisService.getDevisByIdclient(decodedToken.id).subscribe(data => this.deviss = data);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  deleteDetailDevis(id: string): void {
    this.detaildevisService.deleteDetaildevis(id).subscribe(() => this.loadDeviss());
  }

  insertFacture(iddevis: string, idclient: string, idservices: any[]): void {
    // statut = 1 : accepter
    this.devisService.updateStatutDevis(iddevis, { statut: 1 }).subscribe(() => this.loadDeviss());
    let date: any;
    this.devisService.getDevisById(iddevis).subscribe((data) => {
      date = data.date;
    });

    let montant = 0;
    let benefice = 0;
    // Utiliser Promise.all pour attendre la résolution de toutes les promesses
    const serviceIds = idservices.map(serv => {
      return this.serviceService.getMontantById(serv.service._id).toPromise()
        .then((response: any) => {
          montant += response.total;  // Ajouter le montant à la variable
          benefice += response.benefice;
          this.formulematerielService.getFormulematerielByService(serv.service._id).toPromise().then((formuleMateriel) => {
            formuleMateriel.forEach((materiel: any) => {
              this.stockService.addStock({ idmateriel: materiel.idmateriel, date: date, entree: 0, sortie: materiel.quantite }).subscribe();
            });
          });
          return serv.service._id;
        });
    });

    Promise.all(serviceIds).then(() => {
      return this.factureService.addFacture({
        iddevis: iddevis,
        idclient: idclient,
        montant: montant,
        benefice: benefice,
        date: date
      }).subscribe(() => this.loadDeviss());
    }).catch(error => {
      console.error('Erreur lors de la récupération des montants:', error);
    });
  }

  updateStatutDevis(id: string): void {
    this.devisService.deleteDevis(id).subscribe(() =>
      this.detaildevisService.getDetaildevis({ iddevis: id }).subscribe((detailDevis) =>
        this.detaildevisService.deleteDetaildevis(detailDevis[0]._id).subscribe(() => this.loadDeviss()))
    );
  }

  goToDetailDevisCreate() {
    this.router.navigate(['/detaildevis-create']);
  }
}
