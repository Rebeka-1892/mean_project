import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = `${environment.apiUrl}/employes`;
  constructor(private http: HttpClient) { }
  getEmployes(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getEmployeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addEmploye(employe: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, employe, {withCredentials: true});
  }
  updateEmploye(id: string, employe: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, employe, {withCredentials: true});
  }
  deleteEmploye(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
} 