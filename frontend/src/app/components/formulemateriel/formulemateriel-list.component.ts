import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormulematerielService } from '../../services/formulemateriel.service';

@Component({
  selector: 'app-formulemateriel-list',
  imports: [],
  templateUrl: './formulemateriel-list.component.html',
  standalone: true
})
export class FormulematerielListComponent implements OnInit {
  formulemateriels: any[] = [];

  constructor(
    private formulematerielService: FormulematerielService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFormulemateriels();
  }

  loadFormulemateriels(): void {
    this.formulematerielService.getFormulemateriels().subscribe(data => this.formulemateriels =
      data);
  }

  deleteFormulemateriel(id: string): void {
    this.formulematerielService.deleteFormulemateriel(id).subscribe(() => this.loadFormulemateriels());
  }

  updateFormulemateriel(id: string): void {
    this.router.navigate(['/formulemateriels-edit', id]);
  }

  goToFormulematerielCreate() {
    this.router.navigate(['/formulemateriels-create']);
  }
}
