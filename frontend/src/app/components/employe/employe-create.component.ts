import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeService } from '../../services/employe.service';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-employe-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './employe-create.component.html',
    standalone: true
})
export class EmployeCreateComponent implements OnInit {
    list: any;
    newEmploye = { nom: '', motdepasse: '', idrole: '' };

    constructor(
        private employeService: EmployeService,
        private roleService: RoleService,
        private router: Router) { }

    ngOnInit(): void {
        this.roleService.getRoles({ nom: 'mecanicien' }).subscribe(data => {
          this.list = data;
          this.newEmploye.idrole = data[0]._id;
        });
    }

    addEmploye(): void {
        if (this.newEmploye.nom && this.newEmploye.motdepasse && this.newEmploye.idrole) {
            this.employeService.addEmploye(this.newEmploye).subscribe(() => {
                this.router.navigate(['/employes']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/employes']);
    }
}
