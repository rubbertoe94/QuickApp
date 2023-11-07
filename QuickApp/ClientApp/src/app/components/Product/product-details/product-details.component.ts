import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
productId: number;
productDetails: any = {};

constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
this.route.params.subscribe(params => {
  this.productId = +params['id'];
  this.loadProductDetails();
})
  }

  loadProductDetails(): void {
    this.productService.getProductById(this.productId).subscribe(data =>{
      this.productDetails = data || {};
  })
  }
}

