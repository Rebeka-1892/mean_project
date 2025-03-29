import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevisService } from '../../services/devis.service';
import { DemandeService } from '../../services/demande.service';
import { ClientService } from '../../services/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-devis-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './devis-edit.component.html',
    standalone: true
})
export class DevisEditComponent implements OnInit {
    newDevis: any;
    list: any;
    demandes : any;

    constructor(
        private devisService: DevisService,
        private demandeService: DemandeService,
        private clientService: ClientService, 
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.devisService.getDevisById(id).subscribe(data => this.newDevis = data);
            this.demandeService.getDemandes().subscribe(data => this.demandes = data);        
            this.clientService.getClients().subscribe(data => this.list = data);    
        }
    }

    updateDevis(): void {
        if(this.newDevis.idclient && this.newDevis.iddemande && this.newDevis.date) {
            this.devisService.updateDevis(this.newDevis._id, this.newDevis).subscribe(() => {
                this.router.navigate(['/devis']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/devis']);
    }
}
