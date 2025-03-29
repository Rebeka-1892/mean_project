import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormuleroleService } from '../../services/formulerole.service';

@Component({
  selector: 'app-formulerole-list',
  imports: [],
  templateUrl: './formulerole-list.component.html',
  standalone: true
})
export class FormuleroleListComponent implements OnInit {
  formuleroles: any[] = [];
  
  constructor(
    private formuleroleService: FormuleroleService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFormuleroles();
  }

  loadFormuleroles(): void {
    this.formuleroleService.getFormuleroles().subscribe(data => this.formuleroles =
      data);
  }

  deleteFormulerole(id: string): void {
    this.formuleroleService.deleteFormulerole(id).subscribe(() => this.loadFormuleroles());
  }

  updateFormulerole(id: string): void {
    this.router.navigate(['/formuleroles-edit', id]);
  }

  goToFormuleroleCreate() {
    this.router.navigate(['/formuleroles-create']);
  }
}
