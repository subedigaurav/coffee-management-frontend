import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCoffeesComponent } from './top-coffees.component';

describe('TopCoffeesComponent', () => {
  let component: TopCoffeesComponent;
  let fixture: ComponentFixture<TopCoffeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCoffeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopCoffeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
