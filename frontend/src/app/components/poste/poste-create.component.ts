import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosteService } from '../../services/poste.service';
import { EmployeService } from '../../services/employe.service';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { log } from 'console';

@Component({
    selector: 'app-poste-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './poste-create.component.html',
    standalone: true
})
export class PosteCreateComponent implements OnInit {
    list: any;
    roles: any;
    newPoste = { idemploye: '', idrole: [] as string[] };

    constructor(
        private posteService: PosteService,
        private employeService: EmployeService,
        private roleService: RoleService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.employeService.getEmployes().subscribe(data => this.list = data);
        this.roleService.getRoles().subscribe(data => this.roles = data);
    }

    toggleRole(id: string, event: Event) {
        const inputElement = event.target as HTMLInputElement; // Caster l'élément pour accéder à `checked`
        const isChecked = inputElement.checked;
        if (isChecked) {
            this.newPoste.idrole.push(id); // Ajouter l'ID du rôle sélectionné
        } else {
            this.newPoste.idrole = this.newPoste.idrole.filter(roleId => roleId !== id); // Retirer si décoché
        }
    }

    addPoste(): void {
        if (this.newPoste.idemploye && this.newPoste.idrole.length > 0) {
            const requests = this.newPoste.idrole.map(id => {
                return this.posteService.addPoste({ idemploye: this.newPoste.idemploye, idrole: id });
            });

            // Exécuter toutes les requêtes en parallèle
            Promise.all(requests.map(req => req.toPromise()))
                .then(() => {
                    this.router.navigate(['/postes']);
                })
                .catch(error => console.error('Erreur lors de l’ajout des postes :', error));
        }
    }
}