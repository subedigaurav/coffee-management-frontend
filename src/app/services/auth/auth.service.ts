import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    this.loggedIn$.next(!!localStorage.getItem('auth-token'));
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('auth-token');
    this.loggedIn$.next(false);
    return of(true);
  }

  login(credentials: { username: string; password: string }) {
    return this.httpClient
      .post(environment.AUTH_URL + 'login', {
        username: credentials.username,
        password: credentials.password,
      })
      .pipe(
        tap((res: any) => {
          localStorage.removeItem('auth-token');
          localStorage.setItem('auth-token', res.token);
          this.loggedIn$.next(true);
        })
      );
  }

  register(credentials: {
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
  }) {
    return this.httpClient.post(environment.AUTH_URL + 'register', {
      email: credentials.email,
      username: credentials.username,
      password: credentials.password,
      first_name: credentials.first_name,
      last_name: credentials.last_name,
      phone_number: 1234,
      address: 'asdfasdfasdf',
    });
  }
}
