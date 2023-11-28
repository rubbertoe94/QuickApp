import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OrderViewModel } from 'src/app/models/order-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductViewModel } from 'src/app/models/product-model';
import { CustomerViewModel } from 'src/app/models/customer-model';
import { CustomerService } from 'src/app/services/customer-service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
product: any = {};
order: any = {};
customer: any = {};
orderId: number;

constructor(private orderservice: OrderService, private customerservice: CustomerService, private route: ActivatedRoute, private router: Router){}

ngOnInit() {
  this.route.params.subscribe(params => {
    this.orderId = +params['id'];
    this.loadDetails();
  })
}

loadDetails() {
  return this.orderservice.getOrderById(this.orderId).subscribe(data => {
    this.order = data;
    this.customer = this.order.customer;
    this.product = this.order.product;
  })
}

onEdit(): void {
  this.router.navigate(['/order-form', this.orderId])
}

}
