import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.httpClient.post(environment.AUTH_URL + 'login', {
      username: credentials.username,
      password: credentials.password,
    });
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
