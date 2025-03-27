import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniteService } from '../../services/unite.service';

@Component({
  selector: 'app-unite-list',
  imports: [],
  templateUrl: './unite-list.component.html',
  standalone: true
})
export class UniteListComponent implements OnInit {
  unites: any[] = [];
  
  constructor(private uniteService: UniteService, private router: Router) { }
  ngOnInit(): void {
    this.loadUnites();
  }

  loadUnites(): void {
    this.uniteService.getUnites().subscribe(data => this.unites =
      data);
  }

  deleteUnite(id: string): void {
    this.uniteService.deleteUnite(id).subscribe(() => this.loadUnites());
  }

  updateUnite(id: string): void {
    this.router.navigate(['/unites-edit', id]);
  }

  goToUniteCreate() {
    this.router.navigate(['/unites-create']);
  }
}
