import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FactureService } from '../../services/facture.service';
import { EmployeService } from '../../services/employe.service';
import { StockService } from '../../services/stock.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  standalone: true
})
export class DashboardComponent implements OnInit {
  clients: any;
  total: any;
  employes : any;
  benefice : any;
  stocks : any[] = [];
  montants: any[] = [];
  chart: any;

  constructor(
    private factureService: FactureService,
    private clientService: ClientService,
    private employeService: EmployeService,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.factureService.getMontantParMois().subscribe(data => {
      this.montants = data;
      this.createChart();
    });
    this.clientService.getNombreClients().subscribe(data => this.clients = data);
    this.factureService.getMontantTotal().subscribe(data => this.total = data.total);
    this.factureService.getMontantTotal().subscribe(data => this.benefice = data.benefice);
    this.employeService.getNombreEmployes().subscribe(data => this.employes = data);
    this.stockService.getEtat().subscribe(data => this.stocks = data);
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  
    const moisNoms = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
  
    const year = new Date().getFullYear(); // Année en cours (ou récupérée dynamiquement)
    
    // Création d'un tableau pour tous les mois avec une valeur par défaut de 0
    const moisData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      label: `${moisNoms[i]} ${year}`,
      totalMontant: 0
    }));
  
    // Remplissage des valeurs avec les données existantes
    this.montants.forEach(m => {
      const index = m._id.month - 1; // Ajustement de l'index du mois
      if (index >= 0 && index < 12) {
        moisData[index].totalMontant = m.totalMontant;
      }
    });
  
    // Extraire les labels et les valeurs mis à jour
    const labels = moisData.map(m => m.label);
    const values = moisData.map(m => m.totalMontant);
  
    // Création du graphique
    const ctx = document.getElementById('chart') as HTMLCanvasElement | null;
    if (!ctx) {
      console.error('Canvas not found');
      return;
    }
  
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Montant par mois',
          data: values,
          backgroundColor: 'rgba(0, 71, 102, 0.8)',
          borderColor: 'rgba(0, 71, 102, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (tickValue: string | number) {
                const value = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
                return new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'MDG'
                }).format(value);
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Montants par mois'
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}