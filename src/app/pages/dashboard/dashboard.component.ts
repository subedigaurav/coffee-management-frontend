import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { TopCoffeesComponent } from '../../components/top-coffees/top-coffees.component';
import { OrderHistoryComponent } from '../../components/order-history/order-history.component';
import { OrderHistoryCardComponent } from '@components/order-history-card/order-history-card.component';
import { OrderDialogComponent } from '@components/order-dialog/order-dialog.component';
import { AnimateModule } from 'primeng/animate';
import { CommonModule } from '@angular/common';
import { CoffeeService } from '@services/coffee/coffee.service';
import { HttpClientModule } from '@angular/common/http';
import { OrdersService } from '@services/orders/orders.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableOrdersComponent } from '../table-orders/table-orders.component';

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
    ConfirmDialogModule,
    OverlayPanelModule,
    TableOrdersComponent,
    RouterOutlet,
  ],
  providers: [CoffeeService, OrdersService, MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  currentOrder: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getOrderInfo();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getOrderInfo() {
    const storedCurrentOrder = <string>localStorage.getItem('current-order');
    this.currentOrder = JSON.parse(storedCurrentOrder);
  }

  goToOrderView() {
    this.router.navigate(['order'], {
      relativeTo: this.route,
      queryParams: {
        orderId: this.currentOrder.id,
      },
    });
  }
}
