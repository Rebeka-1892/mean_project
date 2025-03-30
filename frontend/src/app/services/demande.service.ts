import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = `${environment.apiUrl}/demandes`;
  constructor(private http: HttpClient) { }
  getDemandes(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getDemandeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addDemande(demande: any): Observable<any> {
    return this.http.post(this.apiUrl, demande, {withCredentials: true});
  }
  updateDemande(id: string, demande: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, demande, {withCredentials: true});
  }
  deleteDemande(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  async getIds(): Promise<string[]> {
    const response: any[] | undefined = await this.http.get<any[]>(`${this.apiUrl}/ids`, { withCredentials: true }).toPromise();
    if (!Array.isArray(response)) {
      return [];
    }
    return response.map(item => item.id);
  }
}
