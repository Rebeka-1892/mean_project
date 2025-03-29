import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-service-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './service-create.component.html',
    standalone: true
})
export class ServiceCreateComponent implements OnInit{
    // list : any;
    newService = { nom: '', marge: '', };
    
    constructor(
        private serviceService: ServiceService, 
        private router: Router
    ) { }

    ngOnInit(): void {
        // this.serviceService.getServices().subscribe(data => this.list = data);
    }

    addService(): void {
        if(this.newService.nom && this.newService.marge) {
            this.serviceService.addService(this.newService).subscribe(() => {
                this.router.navigate(['/services']);
            });
        }
    }    

    goBackToList() {
        this.router.navigate(['/services']);
    }
}