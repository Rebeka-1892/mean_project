import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormulematerielService } from '../../services/formulemateriel.service';
import { ServiceService } from '../../services/service.service';
import { MaterielService } from '../../services/materiel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-formulemateriel-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './formulemateriel-edit.component.html',
    standalone: true
})
export class FormulematerielEditComponent implements OnInit {
    newFormulemateriel: any;
    list: any;
    materiels: any;

    constructor(
        private formulematerielService: FormulematerielService,
        private serviceService: ServiceService,
        private materielService: MaterielService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.formulematerielService.getFormulematerielById(id).subscribe(data => this.newFormulemateriel = data);
            this.serviceService.getServices().subscribe(data => this.list = data);
            this.materielService.getMateriels().subscribe(data => this.materiels = data);
        }
    }

    updateFormulemateriel(): void {
        if (this.newFormulemateriel.idservice && this.newFormulemateriel.idmateriel && this.newFormulemateriel.quantite) {
            this.formulematerielService.updateFormulemateriel(this.newFormulemateriel._id, this.newFormulemateriel).subscribe(() => {
                this.router.navigate(['/formulemateriels']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/formulemateriels']);
    }
}
