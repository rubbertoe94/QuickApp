// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Role } from '../models/role.model';

import { AuthService } from './auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './configuration.service';
import { LocationViewModel, AddLocationViewModel } from '../models/pickleball.models';
import { json } from 'stream/consumers';

export type RolesChangedOperation = 'add' | 'delete' | 'modify';
export interface RolesChangedEventArg { roles: Role[] | string[]; operation: RolesChangedOperation; }


@Injectable()
export class LocationEndpoint extends EndpointBase {
  get basicUrl() {return this.configurations.baseUrl + '/api/Location'}
 

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getLocationsEndpoint<T>(): Observable<T> {
    const endpointUrl = this.basicUrl + "/allLocations";

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getLocationsEndpoint<T>());
      }));
  }

  addLocationEndpoint<T>(Location: AddLocationViewModel): Observable<T> {
    const endpointUrl = this.basicUrl + '/addLocation';
    return this.http.post<T>(endpointUrl, JSON.stringify(Location), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.addLocationEndpoint<T>(Location));
      }));
  }

  getLocationByIdEndpoint<T>(LocationId: number): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/Location/${LocationId}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getLocationByIdEndpoint<T>(LocationId));
      }));
  }

  updateLocationEndpoint<T>(LocationId: number, Location: LocationViewModel): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/Location/${LocationId}`;
    return this.http.put<T>(endpointUrl, JSON.stringify(Location), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.updateLocationEndpoint<T>(LocationId, Location));
      }));
  }

  deleteLocationEndpoint<T>(LocationId: number): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/Location/${LocationId}`;
    return this.http.delete<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.deleteLocationEndpoint<T>(LocationId));
      }));
  }

 
}


@Injectable()
export class LocationService {
  public static readonly roleAddedOperation: RolesChangedOperation = 'add';
  public static readonly roleDeletedOperation: RolesChangedOperation = 'delete';
  public static readonly roleModifiedOperation: RolesChangedOperation = 'modify';

  private rolesChanged = new Subject<RolesChangedEventArg>();

  constructor(
    private authService: AuthService,
    private LocationEndpoint: LocationEndpoint) {

  }

  getLocations(): Observable<any> {
    return this.LocationEndpoint.getLocationsEndpoint();
  }
  addLocation(location: AddLocationViewModel): Observable<any> {
    return this.LocationEndpoint.addLocationEndpoint(location);
  }
}
