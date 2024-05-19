import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  constructor(private httpClient: HttpClient) {}

  getTables(): any {
    return this.httpClient.get(environment.API_URL + 'table/');
  }

  payTableBill(id: number) {
    return this.httpClient.patch(`${environment.API_URL}table/${id}/`, {
      is_paid: true,
    });
  }

  getAllOrders(tableId: string) {
    return this.httpClient.get(`${environment.API_URL}order/${tableId}/`);
  }
}
