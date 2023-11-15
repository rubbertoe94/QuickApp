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
  isFiltering: boolean = false;

constructor(private productService: ProductService) {}


ngOnInit(): void{
  this.loadProducts();
}

loadProducts(): void{
  this.productService.getProducts().subscribe({
    next: (result: ProductViewModel[]) => {
      console.log('the result of next in getProducts is: ', result);
      this.products = result;
    },
    error: (er) => {
      
      console.log(er);
    }
  })
}

filterResults():void {
  console.log('searchTerm: ', this.searchTerm);
  // fancy code to filter this.products by my search term
  if (!this.searchTerm) {
    this.loadProducts();
    this.isFiltering = false;
  } 

  this.filteredProducts = this.products.filter(p => p.name.toLowerCase().includes(this.searchTerm));
  this.isFiltering = true;
  }

clearFilter(): void {
  console.log('filter box cleared');
  this.searchTerm = '';
  this.filteredProducts = [];
  this.loadProducts();
}
 
}
