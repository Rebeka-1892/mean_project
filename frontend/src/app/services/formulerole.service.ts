import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FormuleroleService {
  private apiUrl = `${environment.apiUrl}/formuleroles`;
  constructor(private http: HttpClient) { }
  getFormuleroles(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getFormuleroleById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addFormulerole(formulerole: any): Observable<any> {
    return this.http.post(this.apiUrl, formulerole, {withCredentials: true});
  }
  updateFormulerole(id: string, formulerole: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formulerole, {withCredentials: true});
  }
  deleteFormulerole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
} 