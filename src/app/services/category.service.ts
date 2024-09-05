import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}categories`);
  }

  getCategory(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}category/${id}`);
  }

  deleteCategory(id: number, options?: any): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}category/${id}`, options);
  }

  addCategory(category: Category): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}category`, category);
  }

  editCategory(category: Category): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}category`, category);
  }
}
