import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormuleroleService } from '../../services/formulerole.service';
import { ServiceService } from '../../services/service.service';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-formulerole-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './formulerole-edit.component.html',
    standalone: true
})
export class FormuleroleEditComponent implements OnInit {
    newFormulerole: any;
    list: any;
    roles: any;

    constructor(
        private formuleroleService: FormuleroleService,
        private serviceService: ServiceService,
        private roleService: RoleService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.formuleroleService.getFormuleroleById(id).subscribe(data => this.newFormulerole = data);
            this.serviceService.getServices().subscribe(data => this.list = data);
            this.roleService.getRoles({ nom: 'mecanicien' }).subscribe(data => {
                if (data.length > 0) {
                    this.roleService.getRoles({ idrole: data[0]._id }).subscribe(subRoles =>
                      this.roles = subRoles
                    );
                }
            });
        }
    }

    updateFormulerole(): void {
        if(this.newFormulerole.idservice && this.newFormulerole.idrole && this.newFormulerole.nombre && this.newFormulerole.heure) {
            this.formuleroleService.updateFormulerole(this.newFormulerole._id, this.newFormulerole).subscribe(() => {
                this.router.navigate(['/formuleroles']);
            });
        }
    }

    goBackToList() {
        this.router.navigate(['/formuleroles']);
    }
}
