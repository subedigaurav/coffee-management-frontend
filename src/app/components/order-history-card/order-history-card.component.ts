import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { NgOptimizedImage } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { OrderDialogComponent } from '@components/order-dialog/order-dialog.component';

@Component({
  selector: 'app-order-history-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ImageModule,
    NgOptimizedImage,
    TooltipModule,
    OrderDialogComponent,
  ],
  templateUrl: './order-history-card.component.html',
  styleUrl: './order-history-card.component.css',
})
export class OrderHistoryCardComponent {}
