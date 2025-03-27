import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _utilisateur = 'utilisateur';
  getUtilisateur(): any {
      const utilisateur = localStorage.getItem(this._utilisateur);
      return utilisateur ? JSON.parse(utilisateur) : null;
  }

  setUtilisateur(value: any) {
    localStorage.setItem(this._utilisateur, JSON.stringify(value));
  }

  clearUtilisateur() {
    localStorage.removeItem(this._utilisateur);
  }
}
