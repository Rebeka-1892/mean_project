import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TacheService } from '../../services/tache.service';
import { FactureService } from '../../services/facture.service';
import { EmployeService } from '../../services/employe.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tache-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './tache-create.component.html',
    standalone: true
})
export class TacheCreateComponent implements OnInit {
    list: any;
    employes: any;
    newTache = { idfacture: '', idrole: '', idemploye: [] as string[], statut: '', heure: '', };

    constructor(
        private tacheService: TacheService,
        private factureService: FactureService, 
        private employeService: EmployeService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.factureService.getFactures().subscribe(data => this.list = data);
        this.employeService.getEmployes().subscribe(data => this.employes = data);
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
        if (this.newTache.idfacture && this.newTache.idrole && this.newTache.idemploye.length > 0 && this.newTache.statut && this.newTache.heure) {
            const requests = this.newTache.idemploye.map(id => {
                return this.tacheService.addTache({idfacture: this.newTache.idfacture, idrole : this.newTache.idrole, idemploye: id, statut : 0, heure: this.newTache.heure });
            });

            // Exécuter toutes les requêtes en parallèle
            Promise.all(requests.map(req => req.toPromise()))
                .then(() => {
                    this.router.navigate(['/taches']);
                })
                .catch(error => console.error('Erreur lors de l’ajout des postes :', error));
        }
    }

    goBackToList() {
        this.router.navigate(['/taches']);
    }
}