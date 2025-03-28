import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-service-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './service-edit.component.html',
    standalone: true
})
export class ServiceEditComponent implements OnInit {
    newService: any;

    constructor(
        private serviceService: ServiceService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.serviceService.getServiceById(id).subscribe(data => this.newService = data);   
        }
    }

    updateService(): void {
        if(this.newService.nom && this.newService.marge) {
            this.serviceService.updateService(this.newService._id, this.newService).subscribe(() => {
                this.router.navigate(['/services']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/services']);
    }
}
