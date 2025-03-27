import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UniteService } from '../../services/unite.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-unite-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './unite-edit.component.html',
    standalone: true
})
export class UniteEditComponent implements OnInit {
    newUnite: any;

    constructor(
        private uniteService: UniteService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.uniteService.getUniteById(id).subscribe(data => this.newUnite = data);          
        }
    }

    updateUnite(): void {
        if(this.newUnite.nom) {
            this.uniteService.updateUnite(this.newUnite._id, this.newUnite).subscribe(() => {
                this.router.navigate(['/unites']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/unites']);
    }
}
