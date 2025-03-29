import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormulematerielService } from '../../services/formulemateriel.service';
import { ServiceService } from '../../services/service.service';
import { MaterielService } from '../../services/materiel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-formulemateriel-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './formulemateriel-create.component.html',
    standalone: true
})
export class FormulematerielCreateComponent implements OnInit {
    list: any;
    materiels: any;
    newFormulemateriel = { idservice: '', idmateriel: [] as string[], quantite: '' };

    constructor(
        private formulematerielService: FormulematerielService,
        private serviceService: ServiceService,
        private materielService: MaterielService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.serviceService.getServices().subscribe(data => this.list = data);
        this.materielService.getMateriels().subscribe(data => this.materiels = data);
    }

    toggleFormulemateriel(id: string, event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const isChecked = inputElement.checked;
        if (isChecked) {
            this.newFormulemateriel.idmateriel.push(id);
        } else {
            this.newFormulemateriel.idmateriel = this.newFormulemateriel.idmateriel.filter(materielId => materielId !== id);
        }
    }

    addFormulemateriel(): void {
        if (this.newFormulemateriel.idservice && this.newFormulemateriel.idmateriel.length > 0 && this.newFormulemateriel.quantite) {
            const requests = this.newFormulemateriel.idmateriel.map(id => {
                return this.formulematerielService.addFormulemateriel({ idservice: this.newFormulemateriel.idservice, idmateriel: id, quantite: this.newFormulemateriel.quantite });
            });

            // Exécuter toutes les requêtes en parallèle
            Promise.all(requests.map(req => req.toPromise()))
                .then(() => {
                    this.router.navigate(['/formulemateriels']);
                })
                .catch(error => console.error('Erreur lors de l’ajout des formulemateriels :', error));
        }
    }

    goBackToList() {
        this.router.navigate(['/formulemateriels']);
    }
}