import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryCardComponent } from './order-history-card.component';

describe('OrderCardComponent', () => {
  let component: OrderHistoryCardComponent;
  let fixture: ComponentFixture<OrderHistoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
