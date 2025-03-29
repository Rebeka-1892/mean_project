import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevisService } from '../../services/devis.service';
import { DemandeService } from '../../services/demande.service';
import { ClientService } from '../../services/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-devis-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './devis-create.component.html',
    standalone: true
})
export class DevisCreateComponent implements OnInit{
    list : any;
    demandes : any;
    newDevis = { idclient: '', iddemande: '', date: '', };
    
    constructor(
        private devisService: DevisService, 
        private demandeService: DemandeService,
        private clientService: ClientService, 
        private router: Router
    ) { }

    ngOnInit(): void {
        this.demandeService.getDemandes().subscribe(data => this.demandes = data);    
        this.clientService.getClients().subscribe(data => this.list = data);
    }

    addDevis(): void {
        if(this.newDevis.idclient && this.newDevis.iddemande && this.newDevis.date) {
            this.devisService.addDevis(this.newDevis).subscribe(() => {
                this.router.navigate(['/devis']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/devis']);
    }
}