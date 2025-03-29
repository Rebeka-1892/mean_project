import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private apiUrl = `${environment.apiUrl}/devis`;
  constructor(private http: HttpClient) { }
  getDeviss(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getDevisById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addDevis(devis: any): Observable<any> {
    return this.http.post(this.apiUrl, devis, {withCredentials: true});
  }
  updateDevis(id: string, devis: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, devis, {withCredentials: true});
  }
  deleteDevis(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
} 