import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterielService } from '../../services/materiel.service';
import { UniteService } from '../../services/unite.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-materiel-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './materiel-create.component.html',
    standalone: true
})
export class MaterielCreateComponent implements OnInit {
    list: any;
    newMateriel = { nom: '', prix: '', idunite: '', };

    constructor(
        private materielService: MaterielService,
        private uniteService: UniteService, 
        private router: Router
    ) { }

    ngOnInit(): void {
        this.uniteService.getUnites().subscribe(data => this.list = data);
    }

    addMateriel(): void {
        if (this.newMateriel.nom && this.newMateriel.prix && this.newMateriel.idunite) {
            this.materielService.addMateriel(this.newMateriel).subscribe(() => {
                this.router.navigate(['/materiels']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/materiels']);
    }
}