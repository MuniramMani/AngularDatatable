import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { Product, User } from '../model/user';
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
  
  addUser(todos: User): Observable<User> {
    return this.http.post<User>(`${this.serviceUrl}/add`, todos);
  }

  updateUser(todos: User): Observable<User> {
    return this.http.patch<User>(`${this.serviceUrl}/${todos.id}`, todos);
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

  private productUrl = 'https://jsonplaceholder.typicode.com/todos';
  getProducts(): Observable<Product[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<Product[]>(map((data: any) => data));
  }

  addProduct(todos: Product): Observable<Product> {
    return this.http.post<Product>(`${this.serviceUrl}/add`, todos);
  }

  updateProduct(todos: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.serviceUrl}/${todos.id}`, todos);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.serviceUrl}/${id}`);
  }

  deleteProducts(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.serviceUrl}/${id}`);
  }  

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 25) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    // ensure current page isn't out of range
    if (currentPage < 1) { 
        currentPage = 1; 
    } else if (currentPage > totalPages) { 
        currentPage = totalPages; 
    }
    
    let startPage: number, endPage: number;
    if (totalPages <= 8) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }
    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}
}