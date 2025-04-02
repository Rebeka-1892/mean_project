import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetaildevisService } from '../../services/detaildevis.service';

@Component({
  selector: 'app-detaildevis-list',
  imports: [],
  templateUrl: './detaildevis-list.component.html',
  standalone: true
})
export class DetaildevisListComponent implements OnInit {
  detaildeviss: any[] = [];
  
  constructor(
    private detaildevisService: DetaildevisService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDetaildeviss();
  }

  loadDetaildeviss(): void {
    this.detaildevisService.getDetaildevis().subscribe(data => this.detaildeviss =
      data);
  }

  deleteDetaildevis(id: string): void {
    this.detaildevisService.deleteDetaildevis(id).subscribe(() => this.loadDetaildeviss());
  }

  updateDetaildevis(id: string): void {
    this.router.navigate(['/detaildevis-edit', id]);
  }

  goToDetaildevisCreate() {
    this.router.navigate(['/detaildevis-create']);
  }
}
