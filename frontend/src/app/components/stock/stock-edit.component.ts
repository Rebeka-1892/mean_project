import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { MaterielService } from '../../services/materiel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stock-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './stock-edit.component.html',
    standalone: true
})
export class StockEditComponent implements OnInit {
    newStock: any;
    list: any;

    constructor(
        private materielService: MaterielService,
        private stockService: StockService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.stockService.getStockById(id).subscribe(data => this.newStock = data);
            this.materielService.getMateriels().subscribe(data => this.list = data);            
        }
    }

    updateStock(): void {
        if(this.newStock.date && this.newStock.idmateriel && this.newStock.entree && this.newStock.sortie) {
            this.stockService.updateStock(this.newStock._id, this.newStock).subscribe(() => {
                this.router.navigate(['/stocks']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/stocks']);
    }
}
