import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = `${environment.apiUrl}/services`;
  constructor(private http: HttpClient) { }
  getServices(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getMontantById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/montant/${id}`, {withCredentials: true});
  }
  getServiceById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addService(service: any): Observable<any> {
    return this.http.post(this.apiUrl, service, {withCredentials: true});
  }
  updateService(id: string, service: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, service, {withCredentials: true});
  }
  deleteService(id: string): Observable<any> {
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
