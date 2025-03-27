import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {SharedService} from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sharedService: SharedService, private router: Router) {}

  canActivate(): boolean {
    if (this.sharedService.getUtilisateur()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
