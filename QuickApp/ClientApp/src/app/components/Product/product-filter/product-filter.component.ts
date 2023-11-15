import { Component, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product-service';
import { ProductViewModel } from 'src/app/models/product-model';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  


  

constructor(private productService: ProductService) {

}



}
