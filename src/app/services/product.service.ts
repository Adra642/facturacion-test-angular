import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}products`);
  }

  getProduct(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}product/${id}`);
  }

  deleteProduct(id: number, options?: any): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}product/${id}`, options);
  }

  addProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}product`, product);
  }

  editProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}product`, product);
  }
}
