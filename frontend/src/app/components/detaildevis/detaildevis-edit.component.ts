import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetaildevisService } from '../../services/detaildevis.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-detaildevis-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './detaildevis-edit.component.html',
    standalone: true
})
export class DetaildevisEditComponent implements OnInit {
    newDetaildevis: any;
    list: any;

    constructor(
        private detaildevisService: DetaildevisService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.detaildevisService.getDetaildevisById(id).subscribe(data => this.newDetaildevis = data);
            this.detaildevisService.getDetaildevis().subscribe(data => this.list = data);            
        }
    }

    updateDetaildevis(): void {
        if(this.newDetaildevis.iddevis && this.newDetaildevis.idservice) {
            this.detaildevisService.updateDetaildevis(this.newDetaildevis._id, this.newDetaildevis).subscribe(() => {
                this.router.navigate(['/detaildevis']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/detaildevis']);
    }
}
