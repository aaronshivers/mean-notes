import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = 'http://localhost:3000/login';

  constructor(
    private http: HttpClient,
  ) { }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  login(user: User): Observable<{}> {
    return this.http.post<User>(this.authUrl, user).pipe(
      tap(() => this.setSession),
      shareReplay(),
    );
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  getExpiration(): Moment {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private setSession(authResult): void {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
}
