import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TacheService } from '../../services/tache.service';
import { FactureService } from '../../services/facture.service';
import { EmployeService } from '../../services/employe.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {catchError, of, switchMap} from 'rxjs';
import {RoleService} from '../../services/role.service';
import BaseComponent from '../BaseComponent';
import {FormuleroleService} from '../../services/formulerole.service';

@Component({
    selector: 'app-tache-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './tache-create.component.html',
    standalone: true
})
export class TacheCreateComponent extends BaseComponent implements OnInit {
    list: any;
    employes: any;
    roles: any;
    newTache = { idfacture: '', idrole: '', idemploye: [] as string[] };

    constructor(
        private tacheService: TacheService,
        private factureService: FactureService,
        private employeService: EmployeService,
        private roleService: RoleService,
        private formuleroleService: FormuleroleService,
        private router: Router
    ) {
      super();
    }

    ngOnInit(): void {
      this.factureService.getFactures().pipe(
        switchMap(factures => {
          this.list = factures;
          this.newTache.idfacture = factures[0]._id;
          return this.roleService.getRoleByIdFacture(factures[0]._id);
        }),
        switchMap(roles => {
          this.roles = roles;
          this.newTache.idrole = roles[0]._id;
          return this.employeService.getEmployeByIdFactureAndByIdRole(this.newTache.idfacture, this.newTache.idrole);
        }),
        catchError(error => {
          return of([]);
        })
      ).subscribe(employes => {
        this.employes = employes;
      });
    }

    toggleTache(id: string, event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const isChecked = inputElement.checked;
        if (isChecked) {
            this.newTache.idemploye.push(id);
        } else {
            this.newTache.idemploye = this.newTache.idemploye.filter(serviceId => serviceId !== id);
        }
    }

  addTache(): void {
    if (this.newTache.idfacture && this.newTache.idrole && this.newTache.idemploye.length > 0) {
      this.formuleroleService.getFormuleroleByIdFactureAndByIdRole(this.newTache.idfacture, this.newTache.idrole).pipe(
        switchMap((formulerole) => {
          const heure = formulerole[0].heure;
          const nombre = formulerole[0].nombre;

          if (nombre < this.newTache.idemploye.length) {
            this.error = 'Le nombre d\'employés ne doit pas dépasser le nombre défini dans le rôle.';
            return of(null); // Retourne un observable vide pour arrêter le flux
          }

          const requests = this.newTache.idemploye.map(id => {
            console.log(`id: ${id}, idfacture: ${this.newTache.idfacture}, idrole: ${this.newTache.idrole}, heure: ${heure}`);
            return this.tacheService.addTache({ idfacture: this.newTache.idfacture, idrole: this.newTache.idrole, idemploye: id, statut: 0, heure: heure }).toPromise();
          });

          return Promise.all(requests);
        })
      ).subscribe({
        next: () => {
          this.router.navigate(['/taches']);
        },
        error: (error) => {
          console.error('Erreur lors de l’ajout des postes :', error);
        }
      });
    }
  }

    goBackToList() {
        this.router.navigate(['/taches']);
    }

    onFactureChange() {
        this.roleService.getRoleByIdFacture(this.newTache.idfacture).pipe(
            switchMap(roles => {
                this.roles = roles;
                this.newTache.idrole = roles[0]._id;
                return this.employeService.getEmployeByIdFactureAndByIdRole(this.newTache.idfacture, this.newTache.idrole);
            }),
            catchError(error => {
                return of([]);
            })
        ).subscribe(employes => {
            this.employes = employes;
        });
    }

    onRoleChange() {
        this.employeService.getEmployeByIdFactureAndByIdRole(this.newTache.idfacture, this.newTache.idrole).subscribe((employes) => this.employes = employes);
    }
}
