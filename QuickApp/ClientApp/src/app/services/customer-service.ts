// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { Injectable } from '@angular/core';
import { Observable, Subject, forkJoin } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { AccountEndpoint } from './account-endpoint.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Permission, PermissionValues } from '../models/permission.model';
import { UserEdit } from '../models/user-edit.model';
import { CustomersEndpoint } from './customer-endpoints';
import { CustomerViewModel } from '../models/customer-model';
import { CustomerViewModelInput } from '../models/customer-model';



@Injectable()
export class CustomerService {
 customers: any;


  constructor(
    private authService: AuthService,
    private customersEndpoint: CustomersEndpoint) {

  }

  getCustomers(): Observable<CustomerViewModel[]> {

    return this.customersEndpoint.getCustomerEndpoint();

  }

  addCustomer(customer: CustomerViewModelInput): Observable<any> {
    return this.customersEndpoint.addCustomerEndpoint(customer);
  }



}