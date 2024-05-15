import { Component } from '@angular/core';
import {OrderHistoryCardComponent} from "@components/order-history-card/order-history-card.component";

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [OrderHistoryCardComponent],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent {}
