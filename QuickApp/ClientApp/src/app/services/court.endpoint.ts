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
import { CourtViewModel, UserViewModel, LocationViewModel, LessonViewModel } from '../models/pickleball.models';
import { json } from 'stream/consumers';


@Injectable()
export class CourtEndpoint extends EndpointBase {
  get basicUrl() {return this.configurations.baseUrl + '/api/Court'}
 

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getCourtsEndpoint<T>(): Observable<T> {
    const endpointUrl = this.basicUrl + "/allCourts";

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getCourtsEndpoint<T>());
      }));
  }

  // addOrderEndpoint<T>(order: OrderViewModel): Observable<T> {
  //   const endpointUrl = `${this.configurations.baseUrl}/api/order/addOrder`;
  //   console.log("New Order has reached endpoint and is being sent to server")
  //   return this.http.post<T>(endpointUrl, JSON.stringify(order), this.requestHeaders).pipe(
  //     catchError(error => {
  //       return this.handleError(error, () => this.addOrderEndpoint<T>(order));
  //     })
  //   );
  // }

  // getOrderByIdEndpoint<T>(orderId: number): Observable<T> {
  //   const endpointUrl = `${this.configurations.baseUrl}/api/order/${orderId}`;

  //   return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
  //     catchError(error => {
  //       return this.handleError(error, () => this.getOrderByIdEndpoint<T>(orderId));
  //     }));
  // }

  // updateOrderEndpoint<T>(orderId: number, order: OrderViewModel): Observable<T> {
  //   const endpointUrl = `${this.configurations.baseUrl}/api/order/${orderId}`;
  //   return this.http.put<T>(endpointUrl, JSON.stringify(order), this.requestHeaders).pipe(
  //     catchError(error => {
  //       return this.handleError(error, () => this.updateOrderEndpoint<T>(orderId, order));
  //     }));
  // }

  // deleteOrderEndpoint<T>(orderId: number): Observable<T> {
  //   const endpointUrl = `${this.configurations.baseUrl}/api/order/${orderId}`;
  //   return this.http.delete<T>(endpointUrl, this.requestHeaders).pipe(
  //     catchError(error => {
  //       return this.handleError(error, () => this.deleteOrderEndpoint<T>(orderId));
  //     }));
  // }

 
}