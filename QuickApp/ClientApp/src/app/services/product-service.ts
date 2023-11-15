// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


import { ProductEndpoint } from './product-endpoints';
import { AuthService } from './auth.service';
import { Role } from '../models/role.model';
import { ProductViewModel } from '../models/product-model';

export type RolesChangedOperation = 'add' | 'delete' | 'modify';
export interface RolesChangedEventArg { roles: Role[] | string[]; operation: RolesChangedOperation; }

@Injectable()
export class ProductService {
  public static readonly roleAddedOperation: RolesChangedOperation = 'add';
  public static readonly roleDeletedOperation: RolesChangedOperation = 'delete';
  public static readonly roleModifiedOperation: RolesChangedOperation = 'modify';

  private rolesChanged = new Subject<RolesChangedEventArg>();

  constructor(
    private authService: AuthService,
    private productEndpoint: ProductEndpoint) {

  }

  getProducts(): Observable<ProductViewModel[]> {
    return this.productEndpoint.getAllProductsEndpoint();
  }

  getProductById(productId: number): Observable<any> {
    return this.productEndpoint.getProductByIdEndpoint(productId);
  }

  addProduct(product: ProductViewModel): Observable<any> {
    return this.productEndpoint.addProductEndpoint(product);
  }

  updateProduct(productId: number, productData: any): Observable<any> {
    return this.productEndpoint.updateProductEndpoint(productId, productData);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.productEndpoint.deleteProductEndpoint(productId);
  }

  searchProducts(text: string): Observable<any> {
    return this.productEndpoint.searchProductsEndpoint(text);
  }
  
}
