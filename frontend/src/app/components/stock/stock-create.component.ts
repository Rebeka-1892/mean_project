import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { MaterielService } from '../../services/materiel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stock-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './stock-create.component.html',
    standalone: true
})
export class StockCreateComponent implements OnInit{
    list : any;
    newStock = { date: '', idmateriel: '', entree: '', sortie: '0', };
    
    constructor(
        private materielService: MaterielService,
        private stockService: StockService, 
        private router: Router
    ) { }

    ngOnInit(): void {
        this.materielService.getMateriels().subscribe(data => this.list = data);
    }

    addStock(): void {
        if(this.newStock.date && this.newStock.idmateriel && this.newStock.entree && this.newStock.sortie) {
            this.stockService.addStock(this.newStock).subscribe(() => {
                this.router.navigate(['/stocks']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/stocks']);
    }
}