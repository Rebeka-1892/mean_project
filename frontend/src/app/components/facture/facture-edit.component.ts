import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureService } from '../../services/facture.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-facture-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './facture-edit.component.html',
    standalone: true
})
export class FactureEditComponent implements OnInit {
    newFacture: any;
    list: any;

    constructor(
        private factureService: FactureService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.factureService.getFactureById(id).subscribe(data => this.newFacture = data);
            this.factureService.getFactures().subscribe(data => this.list = data);            
        }
    }

    updateFacture(): void {
        if(this.newFacture.iddevis && this.newFacture.idclient && this.newFacture.montant) {
            this.factureService.updateFacture(this.newFacture._id, this.newFacture).subscribe(() => {
                this.router.navigate(['/factures']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/factures']);
    }
}
