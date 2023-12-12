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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [fadeInOut]
})
export class OrdersComponent {
orders: OrderViewModel[];
totalPages: number;

page: number = 1;
pageSize: number;
totalItems: number; //called "count" in the blog tutorial

constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute) {}

ngOnInit():void {
  this.loadOrders();
}

loadOrders(): void {
  this.orderService.getOrders(this.page).subscribe({
    next: (result: any) => {
      this.orders = result.orders;
      this.page = result.pageNumber;
      this.pageSize = result.pageSize;
      this.totalItems = result.totalItems;
      this.totalPages = result.totalPages
    }, error: (er) => {
      console.log(er);}})}
handlePageChange(event) {
  this.page = event;
  this.loadOrders();
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

copyOrder(orderId: number, event: Event) {
  event.stopPropagation();
  this.orderService.copyOrder(orderId).subscribe(
    () => {window.alert('Order copied successfully');
    this.loadOrders();
  },
    error => {
      console.error('Error copying order:', error);
      window.alert('Failed to copy order. Please try again.');
    });
  }

}
