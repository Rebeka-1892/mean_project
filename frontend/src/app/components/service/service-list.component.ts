import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-service-list',
  imports: [],
  templateUrl: './service-list.component.html',
  standalone: true
})
export class ServiceListComponent implements OnInit {
  services: any[] = [];
  
  constructor(
    private serviceService: ServiceService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe(data => this.services =
      data);
  }

  deleteService(id: string): void {
    this.serviceService.deleteService(id).subscribe(() => this.loadServices());
  }

  updateService(id: string): void {
    this.router.navigate(['/services-edit', id]);
  }

  goToServiceCreate() {
    this.router.navigate(['/services-create']);
  }
}
