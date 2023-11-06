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

  getAllCustomers(): Observable<CustomerViewModel[]> {
    return this.customersEndpoint.getAllCustomersEndpoint();
  }
  
  getCustomerById(customerId: number): Observable<any> {
    return this.customersEndpoint.getCustomerByIdEndpoint(customerId);
  }

  addCustomer(customer: CustomerViewModelInput): Observable<any> {
    return this.customersEndpoint.addCustomerEndpoint(customer);
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this.customersEndpoint.deleteCustomerEndpoint(customerId)
  }

  updateCustomer(customerId: number, customerData: any): Observable<any> {
    return this.customersEndpoint.updateCustomerEndpoint(customerId, customerData);
  }

  searchCustomers(searchTerm: string): Observable<any[]> {
    console.log("The term being searched for is:", searchTerm)
    return this.customersEndpoint.searchCustomersEndpoint(searchTerm);
  }
  
}