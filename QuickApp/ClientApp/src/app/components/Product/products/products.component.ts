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
  

constructor(private productService: ProductService) {}


ngOnInit(): void{
  this.loadProducts();
}

loadProducts(): void{
  this.productService.getProducts().subscribe({
    next: (result: ProductViewModel[]) => {
      this.products = result;
    },
    error: (er) => {
      
      console.log(er);
    }
  })
}

filterResults():void {
  let matches: ProductViewModel[] = this.products.filter(p => p.name.toLowerCase().includes(this.searchTerm));
  console.log('searchTerm: ', this.searchTerm);
  if (!this.searchTerm) {
    this.loadProducts();
  } 

    else if(matches.length === 0) {
      alert("No matches were found for that search term")
    }

  else {
    this.filteredProducts = this.products.filter(p => p.name.toLowerCase().includes(this.searchTerm));
  }
  console.log("Matches: ", matches);
  }

clearFilter(): void {
  console.log('filter box cleared');
  this.searchTerm = '';
  this.filteredProducts = [];
  this.loadProducts();
}
 
}
