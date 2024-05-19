import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule, Location } from '@angular/common';
import { TableModule } from 'primeng/table';
import { fromEvent, Subscription } from 'rxjs';
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
  orderId: string = '';
  currentOrder: any;

  private _subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private orderService: OrdersService
  ) {}

  ngOnInit() {
    this._subs.add(
      this.route.queryParamMap.subscribe((params: ParamMap) => {
        this.orderId = <string>params.get('orderId');
        this.getAllOrdersForTable();
      })
    );
  }

  goToDashboardView() {
    this.location.back();
  }

  getAllOrdersForTable() {
    const currentOrder = <string>localStorage.getItem('current-order');
    this.currentOrder = JSON.parse(currentOrder);
  }

  cancelOrder(canceledOrder: any) {
    this.currentOrder.order = this.currentOrder.order.filter(
      (order: any) => order.id !== canceledOrder.id
    );
    this.orderService.updateOrder(this.currentOrder).subscribe(val => {
      localStorage.setItem('current-order', JSON.stringify(this.currentOrder));
    });
  }
}
