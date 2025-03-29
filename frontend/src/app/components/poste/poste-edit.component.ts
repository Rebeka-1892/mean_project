import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PosteService } from '../../services/poste.service';
import { EmployeService } from '../../services/employe.service';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-poste-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './poste-edit.component.html',
    standalone: true
})
export class PosteEditComponent implements OnInit {
    newPoste: any;
    list: any;
    roles : any;

    constructor(
        private posteService: PosteService,
        private employeService: EmployeService, 
        private roleService: RoleService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.posteService.getPosteById(id).subscribe(data => this.newPoste = data);
            this.employeService.getEmployes().subscribe(data => this.list = data);     
            this.roleService.getRoles().subscribe(data => this.roles = data);       
        }
    }

    updatePoste(): void {
        if(this.newPoste.idemploye && this.newPoste.idrole) {
            this.posteService.updatePoste(this.newPoste._id, this.newPoste).subscribe(() => {
                this.router.navigate(['/postes']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/postes']);
    }
}
