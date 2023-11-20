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
import { OrderViewModelEdit } from 'src/app/models/order-model';
import { OrderViewModelList } from 'src/app/models/order-model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [fadeInOut]
})
export class OrdersComponent {
orders: OrderViewModelList[];

constructor(private orderService: OrderService) {}

ngOnInit():void {
  this.loadOrders();
}

loadOrders(): void {
  this.orderService.getOrders().subscribe({
    next: (result: OrderViewModelList[]) => {
      this.orders = result;
    }, 
    error: (er) => {
      
      console.log(er);
    }
  })
}

}
