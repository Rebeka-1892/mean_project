import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  imports: [],
  templateUrl: './client-list.component.html',
  standalone: true
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];
  
  constructor(
    private clientService: ClientService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(data => this.clients =
      data);
  }

  deleteClient(id: string): void {
    this.clientService.deleteClient(id).subscribe(() => this.loadClients());
  }

  updateClient(id: string): void {
    this.router.navigate(['/clients-edit', id]);
  }

  goToClientCreate() {
    this.router.navigate(['/clients-create']);
  }
}
