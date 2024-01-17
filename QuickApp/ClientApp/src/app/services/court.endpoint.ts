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

  getCourtsByLocationIdEndpoint<T>(id: number): Observable<T> {
    const endpointUrl = this.basicUrl + `/locationId/${id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getCourtsByLocationIdEndpoint<T>(id));
      }));
  }

  addCourtEndpoint<T>(Court: CourtViewModel): Observable<T> {
    const endpointUrl = this.basicUrl + '/addCourt';
    return this.http.post<T>(endpointUrl, JSON.stringify(Court), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.addCourtEndpoint<T>(Court));
      }));
  }

  getCourtByIdEndpoint<T>(CourtId: number): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/Court/${CourtId}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getCourtByIdEndpoint<T>(CourtId));
      }));
  }

  updateCourtEndpoint<T>(CourtId: number, Court: CourtViewModel): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/Court/${CourtId}`;
    return this.http.put<T>(endpointUrl, JSON.stringify(Court), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.updateCourtEndpoint<T>(CourtId, Court));
      }));
  }

  deleteCourtEndpoint<T>(CourtId: number): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/Court/${CourtId}`;
    return this.http.delete<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.deleteCourtEndpoint<T>(CourtId));
      }));
  }

 
}
