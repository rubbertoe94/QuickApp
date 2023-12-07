/* eslint-disable @typescript-eslint/no-inferrable-types */
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [fadeInOut]
})
export class OrdersComponent {
orders: OrderViewModel[];
pageNumber: number = 1;
pageSize: number = 20;
totalItems: number;

constructor(private orderService: OrderService, private router: Router) {}

ngOnInit():void {
  this.loadOrders();
}

loadOrders(): void {
  this.orderService.getOrders(this.pageNumber, this.pageSize).subscribe({
    next: (result: any) => {
      this.orders = result.orders;
      this.pageNumber = result.pageNumber;
      this.pageSize = result.pageSize;
      this.totalItems = result.totalItems;
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

copyAllOrders() {
  this.orderService.copyAllOrders().subscribe(
    () => {window.alert('All order copied successfully')});
    this.loadOrders();
}


}
