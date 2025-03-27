import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-role-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './role-edit.component.html', 
    standalone: true
})
export class RoleEditComponent {
    newRole: any = { nom: '', idrole: '', };
    list : any;
    selectedOption: number | null = null;

    constructor(
        private roleService: RoleService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.roleService.getRoleById(id).subscribe((data) => {
                this.newRole = data;
            });
            this.list = this.roleService.getRoles();
        }
    }

    updateRole(): void {
        if(this.newRole.nom && this.newRole.idrole) {
            this.roleService.updateRole(this.newRole._id, this.newRole).subscribe(() => {
                this.router.navigate(['/role']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/roles']);
    }
}
