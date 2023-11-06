// ======================================
// Author: Ebenezer Monney
// Copyright (c) 2023 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

import { Component } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { CustomerService } from 'src/app/services/customer-service';
import { CustomerViewModel, CustomerViewModelInput } from 'src/app/models/customer-model';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  animations: [fadeInOut]
})
export class CustomersComponent {

customers: CustomerViewModel[] = [];




  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
  next: (result: CustomerViewModel[]) => {
    this.customers = result;
  },
  error: (er) => {
    
    console.log(er);
  }
})
  }

  deleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId).subscribe({
      next: () => {
        this.customers = this.customers.filter((customer) => customer.id !== customerId);
        console.log("Customer deleted successfully")
      },
      error: (error) => {
        console.error("Error deleting customer:", error);
      }
    })
  }
  


}
