import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactureService } from '../../services/facture.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-facture-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './facture-create.component.html',
    standalone: true
})
export class FactureCreateComponent implements OnInit{
    list : any;
    newFacture = { iddevis: '', idclient: '', montant: '', };
    
    constructor(
        private factureService: FactureService, 
        private router: Router
    ) { }

    ngOnInit(): void {
        this.factureService.getFactures().subscribe(data => this.list = data);
    }

    addFacture(): void {
        if(this.newFacture.iddevis && this.newFacture.idclient && this.newFacture.montant) {
            this.factureService.addFacture(this.newFacture).subscribe(() => {
                this.router.navigate(['/factures']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/factures']);
    }
}