import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../../services/employe.service';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-employe-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './employe-edit.component.html',
    standalone: true
})
export class EmployeEditComponent implements OnInit {
    newEmploye: any;
    list: any;

    constructor(
        private employeService: EmployeService,
        private roleService: RoleService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.employeService.getEmployeById(id).subscribe(data => this.newEmploye = data);
            this.roleService.getRoles().subscribe(data => this.list = data);
        }
    }

    updateEmploye(): void {
        if (this.newEmploye.nom && this.newEmploye.salaire && this.newEmploye.motdepasse && this.newEmploye.idrole) {
            this.employeService.updateEmploye(this.newEmploye._id, this.newEmploye).subscribe(() => {
                this.router.navigate(['/employes']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/employes']);
    }
}
