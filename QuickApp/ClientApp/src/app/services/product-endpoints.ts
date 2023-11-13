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
import { ProductViewModel } from '../models/product-model';


@Injectable()
export class ProductEndpoint extends EndpointBase {
  get getAllProductsUrl() { return this.configurations.baseUrl + '/api/Product/allproducts' }
  get addProductUrl() { return this.configurations.baseUrl + '/api/Product/addproduct' }

 

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getAllProductsEndpoint<T>(): Observable<T> {
    const endpointUrl = this.getAllProductsUrl;
    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getAllProductsEndpoint<T>());
      }));
  }

  getProductByIdEndpoint<T>(productId:number): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/Product/${productId}` ;
    console.log('requesting product with id: ', productId);
    console.log('constructed URL: ', endpointUrl);
    return this.http.get<T>(endpointUrl, this.requestHeaders);
  }

  addProductEndpoint<T>(product: ProductViewModel): Observable<T> {
    const endpointUrl = this.addProductUrl;
    return this.http.post<T>(endpointUrl, JSON.stringify(product), this.requestHeaders);
  }

  updateProductEndpoint<T>(productId: number, productData: any): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/Product/${productId}`;
    return this.http.put<T>(endpointUrl, JSON.stringify(productData,), this.requestHeaders);
  }
 
}
