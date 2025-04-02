import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = `${environment.apiUrl}/factures`;
  constructor(private http: HttpClient) { }
  getFactures(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getFactureById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addFacture(facture: any): Observable<any> {
    return this.http.post(this.apiUrl, facture, {withCredentials: true});
  }
  updateFacture(id: string, facture: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, facture, {withCredentials: true});
  }
  deleteFacture(id: string): Observable<any> {
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