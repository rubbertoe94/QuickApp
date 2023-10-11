import { Component } from '@angular/core';
import { CustomerViewModelInput } from 'src/app/models/customer-model';
import { CustomerService } from 'src/app/services/customer-service';
import { CustomersEndpoint } from 'src/app/services/customer-endpoints';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {
  customer: CustomerViewModelInput = {
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    gender: ''
  };

  constructor(private customerService: CustomerService) {}

  onSubmit() {
    this.customerService.addCustomer(this.customer)
      .subscribe(response => {
        // Handle successful form submission here
        console.log('Customer added successfully:', response);
      }, error => {
        // Handle error here
        console.error('Error adding customer:', error);
      });
  }
}

