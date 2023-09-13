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


@Injectable()
export class CustomersEndpoint extends EndpointBase {
  get getCustomersUrl() { return this.configurations.baseUrl + '/api/customers'; }
 


  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getCustomerEndpoint<T>(): Observable<T> {
    const endpointUrl = this.getCustomersUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders);
  }

}