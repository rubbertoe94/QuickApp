// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './configuration.service';


import { AuthService } from './auth.service';
import { Role } from '../models/role.model';
import { CourtViewModel, UserViewModel, LocationViewModel, LessonViewModel } from '../models/pickleball.models';
import { CourtEndpoint } from './court.endpoint';

export type RolesChangedOperation = 'add' | 'delete' | 'modify';
export interface RolesChangedEventArg { roles: Role[] | string[]; operation: RolesChangedOperation; }

@Injectable()
export class CourtService {
  public static readonly roleAddedOperation: RolesChangedOperation = 'add';
  public static readonly roleDeletedOperation: RolesChangedOperation = 'delete';
  public static readonly roleModifiedOperation: RolesChangedOperation = 'modify';

  private rolesChanged = new Subject<RolesChangedEventArg>();

  constructor(
    private authService: AuthService,
    private courtEndpoint: CourtEndpoint) {

  }

  getCourts(): Observable<any> {
    return this.courtEndpoint.getCourtsEndpoint();
  }

  getCourtsByLocationId(id: number): Observable<any> {
    return this.courtEndpoint.getCourtsByLocationIdEndpoint(id);
  }

  addCourt(court: CourtViewModel): Observable<any> {
    return this.courtEndpoint.addCourtEndpoint(court);
  }
 
}
