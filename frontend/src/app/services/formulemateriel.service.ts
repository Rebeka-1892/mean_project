import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FormulematerielService {
  private apiUrl = `${environment.apiUrl}/formulemateriels`;
  constructor(private http: HttpClient) { }
  getFormulemateriels(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getFormulematerielById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addFormulemateriel(formulemateriel: any): Observable<any> {
    return this.http.post(this.apiUrl, formulemateriel, {withCredentials: true});
  }
  updateFormulemateriel(id: string, formulemateriel: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formulemateriel, {withCredentials: true});
  }
  deleteFormulemateriel(id: string): Observable<any> {
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
