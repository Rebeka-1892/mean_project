import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-client-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './client-create.component.html',
    standalone: true
})
export class ClientCreateComponent implements OnInit{
    list : any;
    newClient = { nom: '', motdepasse: '', };
    
    constructor(
        private clientService: ClientService, 
        private router: Router
    ) { }

    ngOnInit(): void {
        this.clientService.getClients().subscribe(data => this.list = data);
    }

    addClient(): void {
        if(this.newClient.nom && this.newClient.motdepasse) {
            this.clientService.addClient(this.newClient).subscribe(() => {
                this.router.navigate(['/clients']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/clients']);
    }
}