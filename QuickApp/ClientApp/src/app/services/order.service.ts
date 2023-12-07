// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './configuration.service';


import { OrderEndpoint } from './order.endpoints';
import { AuthService } from './auth.service';
import { Role } from '../models/role.model';
import { OrderViewModel } from '../models/order-model';

export type RolesChangedOperation = 'add' | 'delete' | 'modify';
export interface RolesChangedEventArg { roles: Role[] | string[]; operation: RolesChangedOperation; }

@Injectable()
export class OrderService {
  public static readonly roleAddedOperation: RolesChangedOperation = 'add';
  public static readonly roleDeletedOperation: RolesChangedOperation = 'delete';
  public static readonly roleModifiedOperation: RolesChangedOperation = 'modify';

  private rolesChanged = new Subject<RolesChangedEventArg>();

  constructor(
    private authService: AuthService,
    private orderEndpoint: OrderEndpoint) {

  }

  getOrders(pageNumber: number, pageSize: number): Observable<any[]> {
    return this.orderEndpoint.getOrdersEndpoint(pageNumber, pageSize);
  }

  addOrder(order: OrderViewModel): Observable<any> {
    return this.orderEndpoint.addOrderEndpoint(order);
  }

  getOrderById(orderId: number): Observable<OrderViewModel> {
    return this.orderEndpoint.getOrderByIdEndpoint(orderId);
  }

  updateOrder(orderId: number, order: OrderViewModel): Observable<any> {
    return this.orderEndpoint.updateOrderEndpoint(orderId, order);
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.orderEndpoint.deleteOrderEndpoint(orderId);
  }

  copyAllOrders(): Observable<any> {
    return this.orderEndpoint.copyAllOrdersEndpoint();
  }
  
}
