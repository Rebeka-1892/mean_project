import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PosteService {
  private apiUrl = `${environment.apiUrl}/postes`;
  constructor(private http: HttpClient) { }
  getPostes(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getPosteById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addPoste(poste: any): Observable<any> {
    return this.http.post(this.apiUrl, poste, {withCredentials: true});
  }
  updatePoste(id: string, poste: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, poste, {withCredentials: true});
  }
  deletePoste(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
} 