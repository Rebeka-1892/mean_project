import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetaildevisService } from '../../services/detaildevis.service';
import { ServiceService } from '../../services/service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-detaildevis-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './detaildevis-create.component.html',
    standalone: true
})
export class DetaildevisCreateComponent implements OnInit{
    list : any;
    newDetaildevis = { iddevis: '', idservice: [] as string[] };
    
    constructor(
        private detaildevisService: DetaildevisService, 
        private serviceService: ServiceService, 
        private router: Router
    ) { }

    ngOnInit(): void {
        this.serviceService.getServices().subscribe(data => this.list = data);
    }

    toggleDetaildevis(id: string, event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const isChecked = inputElement.checked;
        if (isChecked) {
            this.newDetaildevis.idservice.push(id);
        } else {
            this.newDetaildevis.idservice = this.newDetaildevis.idservice.filter(serviceId => serviceId !== id);
        }
    }

    addDetaildevis(): void {
        if (this.newDetaildevis.iddevis && this.newDetaildevis.idservice.length > 0 ) {
            const requests = this.newDetaildevis.idservice.map(id => {
                return this.detaildevisService.addDetaildevis({ iddevis: this.newDetaildevis.iddevis, idservice: id});
            });

            // Exécuter toutes les requêtes en parallèle
            Promise.all(requests.map(req => req.toPromise()))
                .then(() => {
                    this.router.navigate(['/detaildevis']);
                })
                .catch(error => console.error('Erreur lors de l’ajout des detaildevis :', error));
        }
    }

    goBackToList() {
        this.router.navigate(['/detaildevis']);
    }
}