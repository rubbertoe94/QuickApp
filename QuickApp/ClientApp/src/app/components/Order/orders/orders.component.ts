// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { Component } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { OrderEndpoint } from 'src/app/services/order.endpoints';
import { OrderService } from 'src/app/services/order.service';
import { OrderViewModel } from 'src/app/models/order-model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [fadeInOut]
})
export class OrdersComponent {
orders: OrderViewModel[];

constructor(private orderService: OrderService) {}

ngOnInit():void {
  this.loadOrders();
}

loadOrders(): void {
  this.orderService.getOrders().subscribe({
    next: (result: OrderViewModel[]) => {
      this.orders = result;
    }, 
    error: (er) => {
      
      console.log(er);
    }
  })
}

deleteOrder(orderId: number, event: Event): void {
  event.stopPropagation();
this.orderService.deleteOrder(orderId).subscribe({
  next: () => {
    this.orders = this.orders.filter((order) => order.id !== orderId)
  },
  error: (error) => {
    console.error("error deleting order: ", error)
  }
})
}


}
