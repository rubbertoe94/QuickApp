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
import { OrderViewModelEdit } from '../models/order-model';


@Injectable()
export class OrderEndpoint extends EndpointBase {
  get getOrdersUrl() {return this.configurations.baseUrl + '/api/order'}
 

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getOrdersEndpoint<T>(): Observable<T> {
    const endpointUrl = this.getOrdersUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getOrdersEndpoint<T>());
      }));
  }

  addOrderEndpoint<T>(order: OrderViewModelEdit): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/order/addOrder`;
    
    return this.http.post<T>(endpointUrl, JSON.stringify(order), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.addOrderEndpoint<T>(order));
      })
    );
  }

  getOrderByIdEndpoint<T>(orderId: number): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/order/${orderId}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getOrdersEndpoint<T>());
      }));
  }

 
}
