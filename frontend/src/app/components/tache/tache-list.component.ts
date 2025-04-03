import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TacheService } from '../../services/tache.service';
import {jwtDecode} from 'jwt-decode';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-tache-list',
  imports: [],
  templateUrl: './tache-list.component.html',
  standalone: true
})
export class TacheListComponent implements OnInit {
  taches: any[] = [];
  role: string = 'manager';

  constructor(
    private tacheService: TacheService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    const decodedToken: any = jwtDecode(token);
    this.role = decodedToken.role
    const params = decodedToken.role === 'manager' ? {} : { idemploye: decodedToken.id, statut: 0 };
    this.tacheService.getTaches(params).subscribe(data => this.taches = data);
  }

  updateTache(id: string): void {
    this.tacheService.getTacheById(id).subscribe(data => {
      data.statut = 1;
      this.tacheService.updateTache(data._id, data).subscribe(() => {
        this.router.navigate(['/taches']);
      });
    });
  }

  goToTacheCreate() {
    this.router.navigate(['/taches-create']);
  }
}
