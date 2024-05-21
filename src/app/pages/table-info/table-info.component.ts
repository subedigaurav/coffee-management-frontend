import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { TopCoffeesComponent } from '@components/top-coffees/top-coffees.component';
import { CoffeeService } from '@services/coffee/coffee.service';
import { OrderDialogComponent } from '@components/order-dialog/order-dialog.component';
import { OrdersService } from '@services/orders/orders.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-table-info',
  standalone: true,
  imports: [ButtonModule, NgIf, TopCoffeesComponent, OrderDialogComponent],
  templateUrl: './table-info.component.html',
  styleUrl: './table-info.component.css',
})
export class TableInfoComponent implements OnInit, OnDestroy {
  public allCoffees: any[] = [];
  public selectedCoffeeToOrder!: any;
  public isOrderDialogVisible: any;
  public currentOrder: any;

  public tableId!: number;

  private subs = new Subscription();

  constructor(
    private coffeeService: CoffeeService,
    private ordersService: OrdersService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllCoffees();

    this.subs.add(
      this.route.paramMap.pipe(filter(res => Boolean(res))).subscribe(res => {
        this.tableId = Number(res.get('id'));
        this.getOrderInfo();
      })
    );
  }

  getAllCoffees() {
    this.coffeeService.getAllCoffees().subscribe((response: any) => {
      this.allCoffees = response;
    });
  }

  getOrderInfo() {
    const storedCurrentOrder = <string>(
      localStorage.getItem(`current-order-table-${this.tableId}`)
    );
    this.currentOrder = JSON.parse(storedCurrentOrder);
  }

  openOrderDialog($event: any) {
    this.selectedCoffeeToOrder = $event;
    this.isOrderDialogVisible = true;
  }

  onPlaceOrder($event: any) {
    if (this.currentOrder) {
      const newOrderObj = structuredClone(this.currentOrder);

      // check if the coffee id already exists in the order
      const coffeeId = $event.order[0].coffee;
      const coffeeOrderExists = newOrderObj.order.some(
        (order: any) => order.coffee === coffeeId
      );

      if (coffeeOrderExists) {
        newOrderObj.order = newOrderObj.order.map((order: any) => {
          if (order.coffee === coffeeId) {
            order.quantity += $event.order[0].quantity;
          }
          return order;
        });
      } else {
        newOrderObj.order = [...this.currentOrder.order, ...$event.order];
      }

      this.ordersService.updateOrder(newOrderObj).subscribe((res: any) => {
        const tableId = res.table;
        localStorage.setItem(
          `current-order-table-${tableId}`,
          JSON.stringify(res)
        );
        this.currentOrder = res;
        this.goToOrderView();
      });
    } else {
      this.ordersService.placeOrder($event).subscribe((res: any) => {
        this.currentOrder = res;
        const tableId = res.table;
        localStorage.setItem(
          `current-order-table-${tableId}`,
          JSON.stringify(res)
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Order Placed',
          detail: 'Your order was placed and is being processed.',
          life: 8000,
        });
        this.goToOrderView();
      });
    }
  }

  goToOrderView() {
    this.router.navigate(['order'], {
      relativeTo: this.route,
      queryParams: {
        orderId: this.currentOrder.id,
        tableId: this.tableId,
      },
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
