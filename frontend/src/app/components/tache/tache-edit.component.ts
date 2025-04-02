import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TacheService } from '../../services/tache.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tache-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './tache-edit.component.html',
    standalone: true
})
export class TacheEditComponent implements OnInit {
    newTache: any;
    list: any;

    constructor(
        private tacheService: TacheService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.tacheService.getTacheById(id).subscribe(data => this.newTache = data);
            this.tacheService.getTaches().subscribe(data => this.list = data);            
        }
    }

    updateTache(): void {
        if(this.newTache.idfacture && this.newTache.idrole && this.newTache.idemploye && this.newTache.statut && this.newTache.heure) {
            this.tacheService.updateTache(this.newTache._id, this.newTache).subscribe(() => {
                this.router.navigate(['/taches']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/taches']);
    }
}
