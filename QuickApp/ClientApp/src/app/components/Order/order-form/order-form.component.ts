import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OrderViewModelEdit, OrderViewModelList } from 'src/app/models/order-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
order: any = {
  discount: null,
  comments: '',
  customerId: null,
  cashierId: ''
};
orderId: number;

constructor(private orderservice: OrderService, private route: ActivatedRoute, private router: Router){}

ngOnInit(): void {

}

onSubmit(): void {
  this.orderservice.addOrder(this.order).subscribe(() => {
    console.log('order added successfully');
    this.router.navigate(['/orders']);
  })
}

}
