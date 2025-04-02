import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DevisService } from '../../services/devis.service';
import { DemandeService } from '../../services/demande.service';
import { ClientService } from '../../services/client.service';
import { ServiceService } from '../../services/service.service';
import { DetaildevisService } from '../../services/detaildevis.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-devis-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './devis-create.component.html',
    standalone: true
})
export class DevisCreateComponent implements OnInit {
    list: any;
    demandes: any;
    services: any;
    newDevis = { idclient: '', iddemande: '', date: '', idservice: [] as string[] };

    constructor(
        private devisService: DevisService,
        private demandeService: DemandeService,
        private clientService: ClientService,
        private serviceService: ServiceService,
        private detaildevisService: DetaildevisService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.newDevis.iddemande = params['iddemande'];
            this.newDevis.idclient = params['idclient'];
        });
        this.demandeService.getDemandes().subscribe(data => this.demandes = data);
        this.clientService.getClients().subscribe(data => this.list = data);
        this.serviceService.getServices().subscribe(data => this.services = data);
    }

    toggleDetaildevis(id: string, event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const isChecked = inputElement.checked;
        if (isChecked) {
            this.newDevis.idservice.push(id);
        } else {
            this.newDevis.idservice = this.newDevis.idservice.filter(serviceId => serviceId !== id);
        }
    }

    addDevis(): void {
        if (this.newDevis.idclient && this.newDevis.iddemande && this.newDevis.date && this.newDevis.idservice.length > 0) {
            this.devisService.addDevis({ idclient: this.newDevis.idclient, iddemande: this.newDevis.iddemande, date: this.newDevis.date, statut: 0 })
                .toPromise()
                .then(devis => {

                    const requests = this.newDevis.idservice.map(id => {
                        return this.detaildevisService.addDetaildevis({ iddevis: devis._id, idservice: id }).toPromise();
                    });

                    return Promise.all(requests);
                })
                .then(() => {
                    this.router.navigate(['/demandes']);
                })
                .catch(error => console.error('Erreur lors de l’ajout des detaildevis :', error));
        }
    }

    goBackToList() {
        this.router.navigate(['/demandes']);
    }
}
