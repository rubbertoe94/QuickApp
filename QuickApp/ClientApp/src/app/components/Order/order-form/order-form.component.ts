import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OrderViewModel } from 'src/app/models/order-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductViewModel } from 'src/app/models/product-model';
import { CustomerViewModel } from 'src/app/models/customer-model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
order: OrderViewModel;
orderId: number;
product: ProductViewModel;
customer: CustomerViewModel;

constructor(private orderservice: OrderService, private route: ActivatedRoute, private router: Router){}

ngOnInit(): void {
this.route.params.subscribe(params => {
  this.orderId = +params['id']
});
if (this.orderId) {
  this.loadOrderDetails();
} else {
  this.order = new OrderViewModel();
}
}

onSubmit(): void {
  if (this.orderId) {
    this.updateOrder();
  } else {
    this.addOrder();
  }
}

loadOrderDetails() {
  return this.orderservice.getOrderById(this.orderId).subscribe({
    next: (data: OrderViewModel) => {this.order = data},
    error: (err) => {console.log(err)}
  });
  this.product = this.order.product;
  this.customer = this.order.customer;
  console.log("order: ", this.order)
}

addOrder(): void {
  this.orderservice.addOrder(this.order).subscribe(() => {
    this.router.navigate(['/orders']);
  })
}

updateOrder(): void {
  this.orderservice.updateOrder(this.orderId, this.order).subscribe({
    next: () => {this.router.navigate(['/order-details', this.orderId])},
    error: (err) => {console.error(err)}
  })
}

}
