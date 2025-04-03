import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = `${environment.apiUrl}/stocks`;
  constructor(private http: HttpClient) { }
  getStocks(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getEtat(): Observable<any> {
    return this.http.get(`${this.apiUrl}/etat`, {withCredentials: true});
  }
  getStockById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addStock(stock: any): Observable<any> {
    return this.http.post(this.apiUrl, stock, {withCredentials: true});
  }
  updateStock(id: string, stock: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, stock, {withCredentials: true});
  }
  deleteStock(id: string): Observable<any> {
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