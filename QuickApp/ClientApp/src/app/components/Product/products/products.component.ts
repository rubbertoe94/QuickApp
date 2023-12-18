/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-inferrable-types */
// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { Component } from '@angular/core';
import { fadeInOut } from '../../../services/animations';
import { ProductViewModel } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product-service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [fadeInOut]
})
export class ProductsComponent {
  products: ProductViewModel[];
  filteredProducts: ProductViewModel[] = [];

  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 3;
  pageSizes: number[] = [3, 6, 9]
  totalItems: number;
  totalPages: number
  

constructor(private productService: ProductService) {}


ngOnInit(): void{
  this.loadProducts();
}

loadProducts() {
  this.productService.getProductsPaged(this.page, this.pageSize, this.searchTerm).subscribe({
    next: (result: any) => {
      this.products = result.products;
      this.page = result.pageNumber;
      this.pageSize = result.pageSize;
      this.totalItems = result.totalItems;
      this.totalPages = result.totalPages;
    },
    error: (er) => {
      console.log(er);
    }
  })
}

onSearch() {
  if (!this.searchTerm) {this.loadProducts()} ;

  this.productService.getProductsPaged(this.page, this.pageSize, this.searchTerm).subscribe({
    next: (result: any) => {
      this.filteredProducts = result.products;
      this.page = result.pageNumber;
      this.pageSize = result.pageSize;
      this.totalItems = result.totalItems;
      this.totalPages = result.totalPages
    }, error: (er) => {
      console.log(er)}})
}

  onClear() {
    this.searchTerm = '';
    this.filteredProducts = null;
    this.productService.getProductsPaged(this.page, this.pageSize, '').subscribe({
      next: (result: any) => {
        this.products = result.products;
        this.page = result.pageNumber;
        this.pageSize = result.pageSize;
        this.totalItems = result.totalItems;
        this.totalPages = result.totalPages;
      },
      error: (er) => {
        console.log(er);
      }
    });
  }


handlePageChange(event) {
this.page = event;
if (this.searchTerm) {
  this.onSearch();
} else {
  this.loadProducts();
}
}

handlePageSizeChange(event) {
  this.pageSize = event.target.value;
  this.page = 1;
  this.loadProducts();
}
 
}
