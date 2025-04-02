import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeService } from '../../services/demande.service';
import { ClientService } from '../../services/client.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
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
    newDemande = { description: '', date: '', };

    constructor(
        private demandeService: DemandeService,
        private clientService: ClientService, 
        private cookie: CookieService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.clientService.getClients().subscribe(data => this.list = data);
    }

    addDemande(): void {
        if (this.newDemande.description && this.newDemande.date) {            
            const token = this.cookie.get('token');
            const decodedToken: any = jwtDecode(token);
            this.demandeService.addDemande({ idclient: decodedToken.id, description: this.newDemande.description, date: this.newDemande.date}).subscribe(() => {
                this.router.navigate(['/demandes']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/demandes']);
    }
}