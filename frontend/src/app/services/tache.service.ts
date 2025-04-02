import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private apiUrl = `${environment.apiUrl}/taches`;
  constructor(private http: HttpClient) { }
  getTaches(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getTacheById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addTache(tache: any): Observable<any> {
    return this.http.post(this.apiUrl, tache, {withCredentials: true});
  }
  updateTache(id: string, tache: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tache, {withCredentials: true});
  }
  deleteTache(id: string): Observable<any> {
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