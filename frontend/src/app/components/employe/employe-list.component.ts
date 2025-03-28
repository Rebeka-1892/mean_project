import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeService } from '../../services/employe.service';

@Component({
  selector: 'app-employe-list',
  imports: [],
  templateUrl: './employe-list.component.html',
  standalone: true
})
export class EmployeListComponent implements OnInit {
  employes: any[] = [];

  constructor(private employeService: EmployeService, private router: Router) { }
  ngOnInit(): void {
    this.loadEmployes();
  }

  loadEmployes(): void {
    this.employeService.getEmployes().subscribe(data => this.employes =
      data);
  }

  deleteEmploye(id: string): void {
    this.employeService.deleteEmploye(id).subscribe(() => this.loadEmployes());
  }

  updateEmploye(id: string): void {
    this.router.navigate(['/employes-edit', id]);
  }

  goToEmployeCreate() {
    this.router.navigate(['/employes-create']);
  }
}
