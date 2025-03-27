import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniteService } from '../../services/unite.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-unite-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './unite-create.component.html',
    standalone: true
})
export class UniteCreateComponent implements OnInit{
    newUnite = { nom: '' };
    
    constructor(private uniteService: UniteService, private router: Router) { }

    ngOnInit(): void {
    }

    addUnite(): void {
        if(this.newUnite.nom) {
            this.uniteService.addUnite(this.newUnite).subscribe(() => {
                this.router.navigate(['/unites']);
            });
        }
    }    
}