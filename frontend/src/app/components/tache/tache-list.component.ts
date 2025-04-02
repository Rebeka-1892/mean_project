import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TacheService } from '../../services/tache.service';

@Component({
  selector: 'app-tache-list',
  imports: [],
  templateUrl: './tache-list.component.html',
  standalone: true
})
export class TacheListComponent implements OnInit {
  taches: any[] = [];
  
  constructor(
    private tacheService: TacheService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTaches();
  }

  loadTaches(): void {
    this.tacheService.getTaches().subscribe(data => this.taches =
      data);
  }

  deleteTache(id: string): void {
    this.tacheService.deleteTache(id).subscribe(() => this.loadTaches());
  }

  updateTache(id: string): void {
    this.router.navigate(['/taches-edit', id]);
  }

  goToTacheCreate() {
    this.router.navigate(['/taches-create']);
  }
}
