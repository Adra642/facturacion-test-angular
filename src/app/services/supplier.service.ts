import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {}

  getAllSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}suppliers`);
  }

  getSupplier(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}supplier/${id}`);
  }

  deleteSupplier(id: number, options?: any): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}supplier/${id}`, options);
  }

  addSupplier(category: Category): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}supplier`, category);
  }

  editSupplier(category: Category): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}supplier`, category);
  }
}
