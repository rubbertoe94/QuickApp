// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './configuration.service';
import { CustomerViewModelInput } from '../models/customer-model';


@Injectable()
export class CustomersEndpoint extends EndpointBase {
  get getAllCustomersUrl() { return this.configurations.baseUrl + '/api/Customer/allcustomers'; }
  get addCustomerUrl() { return this.configurations.baseUrl + '/api/Customer/addcustomer' }
  
 


  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getAllCustomersEndpoint<T>(): Observable<T> {
    const endpointUrl = this.getAllCustomersUrl;
    return this.http.get<T>(endpointUrl, this.requestHeaders);
  }

  getCustomerByIdEndpoint<T>(customerId: number): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/Customer/${customerId}`;
    console.log('Requesting customer with ID:', customerId);
    console.log('Constructed URL:', endpointUrl);
    return this.http.get<T>(endpointUrl, this.requestHeaders);
  }

  addCustomerEndpoint<T>(customer: CustomerViewModelInput): Observable<T> {
    const endpointUrl = this.addCustomerUrl;
    return this.http.post<T>(endpointUrl, JSON.stringify(customer), this.requestHeaders);
  }

  deleteCustomerEndpoint<T>(customerId: number): Observable<T> {
      const endpointUrl= `${this.configurations.baseUrl}/api/Customer/${customerId}`;
      return this.http.delete<T>(endpointUrl, this.requestHeaders);
    }
  
    updateCustomerEndpoint<T>(customerId: number, customerData: any): Observable<T> {
      const endpointUrl= `${this.configurations.baseUrl}/api/Customer/${customerId}`;
      console.log('Requesting customer with ID:', customerId);
      console.log('Constructed URL:', endpointUrl);
      return this.http.put<T>(endpointUrl, JSON.stringify(customerData), this.requestHeaders)
    }

}