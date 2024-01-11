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
import { LessonViewModel, AddLocationViewModel, UserViewModel, CourtViewModel } from '../models/pickleball.models';
import { json } from 'stream/consumers';

export type RolesChangedOperation = 'add' | 'delete' | 'modify';
export interface RolesChangedEventArg { roles: Role[] | string[]; operation: RolesChangedOperation; }


@Injectable()
export class UserEndpoint extends EndpointBase {
  get basicUrl() {return this.configurations.baseUrl + '/api/User'}
 

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getUsersEndpoint<T>(): Observable<T> {
    const endpointUrl = this.basicUrl + "/allUsers";

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getUsersEndpoint<T>());
      }));
  }

  addUserEndpoint<T>(user: UserViewModel): Observable<T> {
    const endpointUrl = this.basicUrl + '/addUser';
    return this.http.post<T>(endpointUrl, JSON.stringify(user), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.addUserEndpoint<T>(user));
      }));
  }

  getUserByIdEndpoint<T>(userId: number): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/User/${userId}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getUserByIdEndpoint<T>(userId));
      }));
  }

  updateUserEndpoint<T>(userId: number, user: UserViewModel): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/User/${userId}`;
    return this.http.put<T>(endpointUrl, JSON.stringify(user), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.updateUserEndpoint<T>(userId, user));
      }));
  }

  deleteUserEndpoint<T>(userId: number): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/User/${userId}`;
    return this.http.delete<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.deleteUserEndpoint<T>(userId));
      }));
  }

 
}


@Injectable()
export class UserService {
  public static readonly roleAddedOperation: RolesChangedOperation = 'add';
  public static readonly roleDeletedOperation: RolesChangedOperation = 'delete';
  public static readonly roleModifiedOperation: RolesChangedOperation = 'modify';

  private rolesChanged = new Subject<RolesChangedEventArg>();

  constructor(
    private authService: AuthService,
    private UserEndpoint: UserEndpoint) {

  }

  getUsers(): Observable<any> {
    return this.UserEndpoint.getUsersEndpoint();
  }
  addUser(user: UserViewModel): Observable<any> {
    return this.UserEndpoint.addUserEndpoint(user);
  }
  getUserById(userId: number): Observable<any> {
    return this.UserEndpoint.getUserByIdEndpoint(userId);
  }
}
