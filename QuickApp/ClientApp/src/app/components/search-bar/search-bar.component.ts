import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer-service';
import { CustomerViewModel } from 'src/app/models/customer-model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchTerm: string = '';
  searchResults: CustomerViewModel[] = [];

constructor(private customerService: CustomerService) {};


  searchCustomers() {
    this.customerService.searchCustomers(this.searchTerm).subscribe(
      (data: CustomerViewModel[]) => {
        this.searchResults = data
      }, 
      error => {
        console.error('error searching customers:', error);
      }
    )
  }
}
