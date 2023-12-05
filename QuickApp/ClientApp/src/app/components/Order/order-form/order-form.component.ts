import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OrderViewModel } from 'src/app/models/order-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductViewModel } from 'src/app/models/product-model';
import { CustomerViewModel } from 'src/app/models/customer-model';
import { ProductService } from 'src/app/services/product-service';
import { CustomerService } from 'src/app/services/customer-service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
order: OrderViewModel;
orderId: number;
//product: ProductViewModel;
customers: any[] = [];
products: any[] = [];

constructor(private orderservice: OrderService, private productService: ProductService, private customerService: CustomerService, private route: ActivatedRoute, private router: Router){}

ngOnInit(): void {
this.route.params.subscribe(params => {
  this.orderId = +params['id']
});
if (this.orderId) {
  this.loadOrderDetails();
} else {
  this.order = new OrderViewModel();
  this.getCustomers();
  this.getProducts();
  this.order.cashierId = "0192c35a-d211-4822-94be-d79631f0b4ba";
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
}

addOrder(): void {
  this.orderservice.addOrder(this.order).subscribe(() => {
    window.alert("Order added successfully");
    this.router.navigate(['/orders']);
  })
}

updateOrder(): void {
  this.orderservice.updateOrder(this.orderId, this.order).subscribe({
    next: () => {this.router.navigate(['/order-details', this.orderId])},
    error: (err) => {console.error(err)}
  })
}

getProducts() {
  this.productService.getProducts().subscribe(
(data) => this.products = data)
}

getCustomers() {
this.customerService.getAllCustomers().subscribe(
  data => {this.customers = data}
)
}

}
