import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}users`);
  }

  getUser(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}user/${id}`);
  }

  deleteUser(id: number, options?: any): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}user/${id}`, options);
  }

  addUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}user`, user);
  }

  editUser(user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}user`, user);
  }
}
