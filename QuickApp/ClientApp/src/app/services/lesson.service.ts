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
export class LessonEndpoint extends EndpointBase {
  get basicUrl() {return this.configurations.baseUrl + '/api/Lesson'}
 

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getLessonsEndpoint<T>(): Observable<T> {
    const endpointUrl = this.basicUrl + "/allLessons";

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getLessonsEndpoint<T>());
      }));
  }

  addLessonEndpoint<T>(lesson: LessonViewModel): Observable<T> {
    const endpointUrl = this.basicUrl + '/addLesson';
    return this.http.post<T>(endpointUrl, JSON.stringify(lesson), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.addLessonEndpoint<T>(lesson));
      }));
  }

  getLessonByIdEndpoint<T>(lessonId: number): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/Lesson/${lessonId}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getLessonByIdEndpoint<T>(lessonId));
      }));
  }

  updateLessonEndpoint<T>(lessonId: number, lesson: LessonViewModel): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/Lesson/${lessonId}`;
    return this.http.put<T>(endpointUrl, JSON.stringify(lesson), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.updateLessonEndpoint<T>(lessonId, lesson));
      }));
  }

  deleteLessonEndpoint<T>(lessonId: number): Observable<T> {
    const endpointUrl = `${this.configurations.baseUrl}/api/Lesson/${lessonId}`;
    return this.http.delete<T>(endpointUrl, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.deleteLessonEndpoint<T>(lessonId));
      }));
  }

 
}


@Injectable()
export class LessonService {
  public static readonly roleAddedOperation: RolesChangedOperation = 'add';
  public static readonly roleDeletedOperation: RolesChangedOperation = 'delete';
  public static readonly roleModifiedOperation: RolesChangedOperation = 'modify';

  private rolesChanged = new Subject<RolesChangedEventArg>();

  constructor(
    private authService: AuthService,
    private LessonEndpoint: LessonEndpoint) {

  }

  getLessons(): Observable<any> {
    return this.LessonEndpoint.getLessonsEndpoint();
  }
  addLesson(lesson: LessonViewModel): Observable<any> {
    return this.LessonEndpoint.addLessonEndpoint(lesson);
  }
  getLessonById(lessonId: number): Observable<any> {
    return this.LessonEndpoint.getLessonByIdEndpoint(lessonId);
  }
}
