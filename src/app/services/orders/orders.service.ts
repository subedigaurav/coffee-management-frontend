import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  getOrderDetails(orderId: string) {
    return this.httpClient.get(environment.API_URL + `order/${orderId}/`);
  }

  placeOrder(orderDetails: {
    order: any[];
    price: number;
    customer: number;
    table: number;
  }) {
    return this.httpClient.post(environment.API_URL + 'order/', orderDetails);
  }

  updateOrder(orderDetails: {
    order: any[];
    id: number;
    price: number;
    customer: number;
    table: number;
  }) {
    return this.httpClient.patch(
      `${environment.API_URL}order/${orderDetails.id}/`,
      orderDetails
    );
  }
}
