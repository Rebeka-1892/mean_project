import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterielService } from '../../services/materiel.service';
import { UniteService } from '../../services/unite.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-materiel-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './materiel-edit.component.html',
    standalone: true
})
export class MaterielEditComponent implements OnInit {
    newMateriel: any;
    list: any;

    constructor(
        private materielService: MaterielService,
        private uniteService: UniteService, 
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.materielService.getMaterielById(id).subscribe(data => this.newMateriel = data);
            this.uniteService.getUnites().subscribe(data => this.list = data);
        }
    }

    updateMateriel(): void {
        if (this.newMateriel.nom && this.newMateriel.prix && this.newMateriel.idunite) {
            this.materielService.updateMateriel(this.newMateriel._id, this.newMateriel).subscribe(() => {
                this.router.navigate(['/materiels']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/materiels']);
    }
}
