import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MaterielService {
  private apiUrl = `${environment.apiUrl}/materiels`;
  constructor(private http: HttpClient) { }
  getMateriels(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getMaterielById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addMateriel(materiel: any): Observable<any> {
    return this.http.post(this.apiUrl, materiel, {withCredentials: true});
  }
  updateMateriel(id: string, materiel: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, materiel, {withCredentials: true});
  }
  deleteMateriel(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
} 