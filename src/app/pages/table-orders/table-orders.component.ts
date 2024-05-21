import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule, Location } from '@angular/common';
import { TableModule } from 'primeng/table';
import { combineLatestWith, map, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrdersService } from '@services/orders/orders.service';

@Component({
  selector: 'app-table-orders',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './table-orders.component.html',
  styleUrl: './table-orders.component.css',
})
export class TableOrdersComponent implements OnInit {
  currentOrder: any;

  private _subs = new Subscription();

  getOrderIdFromParams$ = this.route.queryParamMap.pipe(
    map((params: ParamMap) => [
      <string>params.get('tableId'),
      <string>params.get('orderId'),
    ])
  );

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private orderService: OrdersService
  ) {}

  ngOnInit() {
    this._subs.add(
      this.getOrderIdFromParams$.subscribe(([tableId, orderId]) => {
        this.getAllOrdersForTable(tableId, orderId);
      })
    );
  }

  goToDashboardView() {
    this.location.back();
  }

  getAllOrdersForTable(tableId: string, orderId: string) {
    try {
      const currentOrder = <string>(
        localStorage.getItem(`current-order-table-${tableId}`)
      );
      this.currentOrder = JSON.parse(currentOrder);
    } catch (err) {
      this.currentOrder = null;
    }
  }

  cancelOrder(canceledOrder: any) {
    this.currentOrder.order = this.currentOrder.order.filter(
      (order: any) => order.id !== canceledOrder.id
    );
    this.orderService.updateOrder(this.currentOrder).subscribe(val => {
      const tableId = this.currentOrder.tableId;
      localStorage.setItem(
        `current-order-table-${tableId}`,
        JSON.stringify(this.currentOrder)
      );
    });
  }
}
