import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = `${environment.apiUrl}/roles`;
  constructor(private http: HttpClient) { }
  getRoles(params?: any): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true, params: params});
  }
  getRoleById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  getRoleByIdFacture(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/roles`, {withCredentials: true});
  }
  addRole(role: any): Observable<any> {
    return this.http.post(this.apiUrl, role, {withCredentials: true});
  }
  updateRole(id: string, role: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, role, {withCredentials: true});
  }
  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  async getIds(): Promise<string[]> {
    const response: string[] | undefined = await this.http.get<any[]>(`${this.apiUrl}/ids`, { withCredentials: true }).toPromise();
    if (!Array.isArray(response)) {
      return [];
    }
    return response;
  }
}
