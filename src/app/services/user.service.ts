import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getValue(): any {
    throw new Error('Method not implemented.');
  }
  private serviceUrl = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<User[]>(map((data: any) => data));
  }

  updateUser(todos: User): Observable<User> {
    return this.http.patch<User>(`${this.serviceUrl}/${todos.id}`, todos);
  }

  addUser(todos: User): Observable<User> {
    return this.http.post<User>(`${this.serviceUrl}/add`, todos);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.serviceUrl}/${id}`);
  }

  deleteUsers(todos: User[]): Observable<User[]> {
    return forkJoin(
      todos.map((todos) =>
        this.http.delete<User>(`${this.serviceUrl}/${todos.id}`)
      )
    );
  }
}