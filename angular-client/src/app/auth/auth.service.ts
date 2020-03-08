import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = 'http://localhost:3000/login';
  isLoggedIn = false;

  constructor(
    private http: HttpClient
  ) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.authUrl, user);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
