import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer-service';
import { CustomerViewModel } from 'src/app/models/customer-model';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchTerms = new Subject<string>();
  searchResults: Observable<CustomerViewModel[]>;
  searchTerm: string;
  


constructor(private customerService: CustomerService) {};


ngOnInit(): void {
  this.searchResults = this.searchTerms.pipe(
    debounceTime(300), 
    distinctUntilChanged(),
    switchMap((term: string) => this.customerService.searchCustomers(term)) 
  )
}


search(event: any): void {
  this.searchTerms.next(event);
}

  
}
