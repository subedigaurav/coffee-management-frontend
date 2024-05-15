import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  placeOrder(orderDetails: {
    order: any[];
    price: number;
    customer: number;
    table: number;
  }) {
    return this.httpClient.post(environment.API_URL + 'order/', orderDetails);
  }
}
