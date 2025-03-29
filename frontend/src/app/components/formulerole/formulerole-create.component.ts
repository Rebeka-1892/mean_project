import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormuleroleService } from '../../services/formulerole.service';
import { ServiceService } from '../../services/service.service';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-formulerole-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './formulerole-create.component.html',
    standalone: true
})
export class FormuleroleCreateComponent implements OnInit {
    list: any;
    roles: any;
    newFormulerole = { idservice: '', idrole: [] as string[], nombre: '', heure: '', };

    constructor(
        private formuleroleService: FormuleroleService,
        private serviceService: ServiceService,
        private roleService: RoleService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.serviceService.getServices().subscribe(data => this.list = data);
        this.roleService.getRoles().subscribe(data => this.roles = data);
    }

    toggleFormulerole(id: string, event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const isChecked = inputElement.checked;
        if (isChecked) {
            this.newFormulerole.idrole.push(id);
        } else {
            this.newFormulerole.idrole = this.newFormulerole.idrole.filter(roleId => roleId !== id);
        }
    }

    addFormulerole(): void {
        if (this.newFormulerole.idservice && this.newFormulerole.idrole.length > 0 && this.newFormulerole.nombre && this.newFormulerole.heure) {
            const requests = this.newFormulerole.idrole.map(id => {
                return this.formuleroleService.addFormulerole({ idservice: this.newFormulerole.idservice, idrole: id, nombre: this.newFormulerole.nombre, heure: this.newFormulerole.heure });
            });

            // Exécuter toutes les requêtes en parallèle
            Promise.all(requests.map(req => req.toPromise()))
                .then(() => {
                    this.router.navigate(['/formuleroles']);
                })
                .catch(error => console.error('Erreur lors de l’ajout des formuleroles :', error));
        }
    }

    goBackToList() {
        this.router.navigate(['/formuleroles']);
    }
}