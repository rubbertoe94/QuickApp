import { Component, EventEmitter, Output } from '@angular/core';
import { CustomerViewModelInput } from 'src/app/models/customer-model';
import { CustomerService } from 'src/app/services/customer-service';
import { CustomersEndpoint } from 'src/app/services/customer-endpoints';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
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

  @Output() customerAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(private customerService: CustomerService) {}

  onSubmit() {
    this.customerService.addCustomer(this.customer)
      .subscribe(response => {
        console.log('Customer added successfully:', response);
        this.resetForm();
        this.customerAdded.emit();
      }, error => {
        console.error('Error adding customer:', error);
      });
  }
  resetForm() {
    this.customer = {
      id: 0,
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      city: '',
      gender: ''
    };
  }
}

