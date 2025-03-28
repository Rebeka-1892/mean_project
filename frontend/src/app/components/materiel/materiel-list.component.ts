import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterielService } from '../../services/materiel.service';

@Component({
  selector: 'app-materiel-list',
  imports: [],
  templateUrl: './materiel-list.component.html',
  standalone: true
})
export class MaterielListComponent implements OnInit {
  materiels: any[] = [];

  constructor(
    private materielService: MaterielService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMateriels();
  }

  loadMateriels(): void {
    this.materielService.getMateriels().subscribe(data => this.materiels =
      data);
  }

  deleteMateriel(id: string): void {
    this.materielService.deleteMateriel(id).subscribe(() => this.loadMateriels());
  }

  updateMateriel(id: string): void {
    this.router.navigate(['/materiels-edit', id]);
  }

  goToMaterielCreate() {
    this.router.navigate(['/materiels-create']);
  }
}
