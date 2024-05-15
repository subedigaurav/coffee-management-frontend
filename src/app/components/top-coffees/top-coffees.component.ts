import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-top-coffees',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    DataViewModule,
    ButtonModule,
    NgOptimizedImage,
  ],
  templateUrl: './top-coffees.component.html',
  styleUrl: './top-coffees.component.css',
})
export class TopCoffeesComponent {
  @Input() coffees: any[] = [];
  @Output() order = new EventEmitter<any>();

  openOrderDialog($event: any) {
    this.order.emit($event);
  }
}
