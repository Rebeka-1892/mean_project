import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from '../../services/demande.service';
import { ClientService } from '../../services/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-demande-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './demande-edit.component.html',
    standalone: true
})
export class DemandeEditComponent implements OnInit {
    newDemande: any;
    list: any;

    constructor(
        private demandeService: DemandeService,
        private clientService: ClientService, 
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.demandeService.getDemandeById(id).subscribe(data => this.newDemande = data);
            this.clientService.getClients().subscribe(data => this.list = data);
        }
    }

    updateDemande(): void {
        if (this.newDemande.idclient && this.newDemande.description && this.newDemande.date) {
            this.demandeService.updateDemande(this.newDemande._id, this.newDemande).subscribe(() => {
                this.router.navigate(['/demandes']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/demandes']);
    }
}
