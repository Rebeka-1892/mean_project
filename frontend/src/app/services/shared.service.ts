import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _utilisateur: any;
  getUtilisateur(): any {
    return this._utilisateur;
  }

  setUtilisateur(value: any) {
    this._utilisateur = value;
  }
}
