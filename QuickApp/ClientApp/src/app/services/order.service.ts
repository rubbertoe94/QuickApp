// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


import { OrderEndpoint } from './order.endpoints';
import { AuthService } from './auth.service';
import { Role } from '../models/role.model';
import { OrderViewModelEdit } from '../models/order-model';
import { OrderViewModelList } from '../models/order-model';

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

  getOrders(): Observable<OrderViewModelList[]> {
    return this.orderEndpoint.getOrdersEndpoint();
  }

  
}