import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosteService } from '../../services/poste.service';

@Component({
  selector: 'app-poste-list',
  imports: [],
  templateUrl: './poste-list.component.html',
  standalone: true
})
export class PosteListComponent implements OnInit {
  postes: any[] = [];
  
  constructor(
    private posteService: PosteService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPostes();
  }

  loadPostes(): void {
    this.posteService.getPostes().subscribe(data => this.postes =
      data);
  }

  deletePoste(id: string): void {
    this.posteService.deletePoste(id).subscribe(() => this.loadPostes());
  }

  updatePoste(id: string): void {
    this.router.navigate(['/postes-edit', id]);
  }

  goToPosteCreate() {
    this.router.navigate(['/postes-create']);
  }
}
