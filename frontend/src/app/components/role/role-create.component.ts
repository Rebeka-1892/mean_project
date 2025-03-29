import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-role-create',
    imports: [CommonModule, FormsModule],
    templateUrl: './role-create.component.html',
    standalone: true
})
export class RoleCreateComponent implements OnInit{
    list : any;
    newRole = { nom: '', idrole: '' };

    constructor(private roleService: RoleService, private router: Router) { }

    ngOnInit(): void {
      this.roleService.getRoles().subscribe(data => this.list = data);
    }
    
    addRole(): void {
        if(this.newRole.nom && this.newRole.idrole) {
            this.roleService.addRole(this.newRole).subscribe(() => {
                this.router.navigate(['/roles']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/roles']);
    }
}
