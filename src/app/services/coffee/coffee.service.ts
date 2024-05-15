import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  constructor(private httpClient: HttpClient) {}

  getTopThreeCoffees() {
    return this.httpClient.get(environment.API_URL + 'coffee/?limit=3');
  }

  getAllCoffees() {
    return this.httpClient.get(environment.API_URL + 'coffee/');
  }
}
