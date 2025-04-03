import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-list',
  imports: [],
  templateUrl: './stock-list.component.html',
  standalone: true
})
export class StockListComponent implements OnInit {
  stocks: any[] = [];
  
  constructor(
    private stockService: StockService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe(data => this.stocks =
      data);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  deleteStock(id: string): void {
    this.stockService.deleteStock(id).subscribe(() => this.loadStocks());
  }

  updateStock(id: string): void {
    this.router.navigate(['/stocks-edit', id]);
  }

  goToStockCreate() {
    this.router.navigate(['/stocks-create']);
  }
}
