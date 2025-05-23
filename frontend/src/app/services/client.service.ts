import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, timeout} from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}/clients`;
  constructor(private http: HttpClient) { }
  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user, { withCredentials: true }).pipe(timeout(10000));
  }
  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`, { withCredentials: true });
  }
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { withCredentials: true });
  }
  getClients(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getNombreClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/nombre`, {withCredentials: true});
  }
  getClientById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addClient(client: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, client, {withCredentials: true});
  }
  updateClient(id: string, client: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, client, {withCredentials: true});
  }
  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  async getIds(): Promise<string[]> {
    const response: any[] | undefined = await this.http.get<any[]>(`${this.apiUrl}/ids`, { withCredentials: true }).toPromise();
    if (!Array.isArray(response)) {
      return [];
    }
    return response.map(item => item._id);
  }
}
