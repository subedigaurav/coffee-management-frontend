import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { TopCoffeesComponent } from '../../components/top-coffees/top-coffees.component';
import { OrderHistoryComponent } from '../../components/order-history/order-history.component';
import { OrderHistoryCardComponent } from '@components/order-history-card/order-history-card.component';
import { OrderDialogComponent } from '@components/order-dialog/order-dialog.component';
import { AnimateModule } from 'primeng/animate';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { CommonModule } from '@angular/common';
import { CoffeeService } from '@services/coffee/coffee.service';
import { HttpClientModule } from '@angular/common/http';
import { OrdersService } from '@services/orders/orders.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink,
    AvatarModule,
    HttpClientModule,
    TopCoffeesComponent,
    OrderHistoryComponent,
    OrderHistoryCardComponent,
    OrderDialogComponent,
    AnimateModule,
    CommonModule,
    ToastModule,
  ],
  providers: [CoffeeService, OrdersService, MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  isOrderDialogVisible = false;
  selectedCoffeeToOrder: any;
  topThreeCoffees: any[] = [];

  constructor(
    private coffeeService: CoffeeService,
    private ordersService: OrdersService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getTopThreeCoffees();
  }

  openOrderDialog($event: any) {
    this.selectedCoffeeToOrder = $event;
    this.isOrderDialogVisible = true;
  }

  getTopThreeCoffees() {
    this.coffeeService.getTopThreeCoffees().subscribe((response: any) => {
      this.topThreeCoffees = response.results;
    });
  }

  onPlaceOrder($event: any) {
    this.ordersService.placeOrder($event).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Order Placed',
        detail: 'Your order was placed and is being processed.',
        life: 8000,
      });
    });
  }
}
