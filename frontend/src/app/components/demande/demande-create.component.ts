import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeService } from '../../services/demande.service';
import { ClientService } from '../../services/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-demande-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './demande-create.component.html',
    standalone: true
})
export class DemandeCreateComponent implements OnInit {
    list: any;
    newDemande = { idclient: '', description: '', date: '', };

    constructor(
        private demandeService: DemandeService,
        private clientService: ClientService, 
        private router: Router
    ) { }

    ngOnInit(): void {
        this.clientService.getClients().subscribe(data => this.list = data);
    }

    addDemande(): void {
        if (this.newDemande.idclient && this.newDemande.description && this.newDemande.date) {
            this.demandeService.addDemande(this.newDemande).subscribe(() => {
                this.router.navigate(['/demandes']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/demandes']);
    }
}