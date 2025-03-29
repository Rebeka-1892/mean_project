import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevisService } from '../../services/devis.service';

@Component({
  selector: 'app-devis-list',
  imports: [],
  templateUrl: './devis-list.component.html',
  standalone: true
})
export class DevisListComponent implements OnInit {
  deviss: any[] = [];
  
  constructor(
    private devisService: DevisService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDeviss();
  }

  loadDeviss(): void {
    this.devisService.getDeviss().subscribe(data => this.deviss =
      data);
  }

  deleteDevis(id: string): void {
    this.devisService.deleteDevis(id).subscribe(() => this.loadDeviss());
  }

  updateDevis(id: string): void {
    this.router.navigate(['/devis-edit', id]);
  }

  goToDevisCreate() {
    this.router.navigate(['/devis-create']);
  }
}
