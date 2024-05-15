import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { AnimateModule } from 'primeng/animate';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    CommonModule,
    AnimateModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.css',
})
export class OrderDialogComponent implements OnInit {
  @Input() coffee: any;
  @Output() close = new EventEmitter();
  @Output() order = new EventEmitter();

  visible: boolean = true;

  public formGroup = new FormGroup({
    quantity: new FormControl(1),
  });

  totalPrice = 0;

  onDialogClose() {
    this.visible = false;
    this.close.emit();
  }

  ngOnInit() {
    this.totalPrice = <number>this.coffee.price ?? 0;

    this.formGroup.valueChanges.subscribe(val => {
      this.totalPrice = +val.quantity! * this.coffee.price;
    });
  }

  onPlaceOrder() {
    this.order.emit({
      order: [
        {
          ...this.coffee,
          quantity: this.formGroup.value.quantity,
          coffee: this.coffee.id,
        },
      ],
      price: this.totalPrice,
      customer: 1,
      table: 1,
    });

    this.visible = false;
    this.close.emit();
  }
}
