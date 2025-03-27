import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role-list',
  imports: [],
  templateUrl: './role-list.component.html',
  standalone: true
})
export class RoleListComponent implements OnInit {
  roles: any[] = [];

  constructor(private roleService: RoleService, private router: Router) { }
  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe(data => this.roles =
      data);
  }

  deleteRole(id: string): void {
    this.roleService.deleteRole(id).subscribe(() => this.loadRoles());
  }

  updateRole(id: string): void {
    this.router.navigate(['/roles-edit', id]);
  }

  goToRoleCreate() {
    this.router.navigate(['/roles-create']);
  }
}
