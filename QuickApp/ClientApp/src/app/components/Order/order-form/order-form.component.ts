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
  this.orderservice.addOrder(this.order).subscribe(() => {
    console.log('order added successfully');
    this.router.navigate(['/orders']);
  })
}

loadOrderDetails(): void {
  this.orderservice.getOrderById(this.orderId).subscribe({
    next: (data: OrderViewModel) => {this.order = data},
    error: (err) => {console.log(err)}
  });
  this.product = this.order.product;
  this.customer = this.order.customer;
}

}
