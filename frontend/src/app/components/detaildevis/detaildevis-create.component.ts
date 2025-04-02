import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetaildevisService } from '../../services/detaildevis.service';
import { DevisService } from '../../services/devis.service';
import { ServiceService } from '../../services/service.service';
import { FactureService } from '../../services/facture.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {DemandeService} from '../../services/demande.service';

@Component({
    selector: 'app-detaildevis-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './detaildevis-create.component.html',
    standalone: true
})
export class DetaildevisCreateComponent implements OnInit {
    list: any;
    newDetaildevis = { date: '', idservice: [] as string[] };

    constructor(
        private detaildevisService: DetaildevisService,
        private devisService: DevisService,
        private demandeService: DemandeService,
        private factureService: FactureService,
        private cookie: CookieService,
        private serviceService: ServiceService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.serviceService.getServices().subscribe(data => this.list = data);
    }

    toggleDetaildevis(id: string, event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const isChecked = inputElement.checked;
        if (isChecked) {
            this.newDetaildevis.idservice.push(id);
        } else {
            this.newDetaildevis.idservice = this.newDetaildevis.idservice.filter(serviceId => serviceId !== id);
        }
    }

    addDetaildevis(): void {
    if (this.newDetaildevis.date && this.newDetaildevis.idservice.length > 0) {
      const token = this.cookie.get('token');
      const decodedToken: any = jwtDecode(token);
      let montant = 0;

      this.demandeService.addDemande({ idclient: decodedToken.id, description: 'Service personalisé', date: this.newDetaildevis.date }).subscribe((demande) => {
        this.devisService.addDevis({ idclient: decodedToken.id, iddemande: demande._id, date: this.newDetaildevis.date, statut: 1 }).subscribe((devis) => {
          const requests = this.newDetaildevis.idservice.map(id => {
            return this.serviceService.getMontantById(id).toPromise().then((response) => {
              montant += response;
              return this.detaildevisService.addDetaildevis({ iddevis: devis._id, idservice: id }).toPromise();
            });
          });

          Promise.all(requests).then(() => {
            this.factureService.addFacture({ iddevis: devis._id, idclient: devis.idclient, montant: montant }).subscribe(() => {
              this.router.navigate(['/factures-client']);
            });
          }).catch(error => console.error('Erreur lors de l’ajout des detaildevis :', error));
        });
      });
    }
  }
}
