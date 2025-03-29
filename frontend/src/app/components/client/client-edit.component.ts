import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-client-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './client-edit.component.html',
    standalone: true
})
export class ClientEditComponent implements OnInit {
    newClient: any;
    list: any;

    constructor(
        private clientService: ClientService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.clientService.getClientById(id).subscribe(data => this.newClient = data);
            this.clientService.getClients().subscribe(data => this.list = data);            
        }
    }

    updateClient(): void {
        if(this.newClient.nom && this.newClient.motdepasse) {
            this.clientService.updateClient(this.newClient._id, this.newClient).subscribe(() => {
                this.router.navigate(['/clients']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/clients']);
    }
}
