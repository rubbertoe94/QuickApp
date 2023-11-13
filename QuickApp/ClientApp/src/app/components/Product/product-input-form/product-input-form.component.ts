import { Component } from '@angular/core';
import { ProductViewModel } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.scss']
})
export class ProductInputFormComponent {
product: ProductViewModel;
productId: number;

constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.productId = +params['id'];
    if (this.productId) {
      this.loadProductDetails();
    } else {
      this.product = new ProductViewModel();
    }
  })
}

loadProductDetails(): void {
  this.productService.getProductById(this.productId).subscribe(data => {
    this.product = data;
  })
}

onSave(): void {
  if (this.productId) {
    this.updateProduct();
  } else {
    this.addProduct();
  }
}

addProduct(): void {
  this.product.productCategoryId = 1;
  this.productService.addProduct(this.product).subscribe(() => {
    this.router.navigate(['/products'])
  })
}

updateProduct(): void {
  this.productService.updateProduct(this.productId, this.product).subscribe({
    next: value => {
      console.log('Observable emitted the next value: ', value),
      this.router.navigate(['/products']);
    },
    error: err => {
      console.error('Observable emitted an error: ', err);
    },
    complete: () => {'Observable emitted the complete notification'}
  })
}

}
