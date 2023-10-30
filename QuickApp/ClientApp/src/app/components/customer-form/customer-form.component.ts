import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CustomerViewModelInput } from 'src/app/models/customer-model';
import { CustomerService } from 'src/app/services/customer-service';
import { CustomersEndpoint } from 'src/app/services/customer-endpoints';
import { FormsModule } from '@angular/forms';
import { CustomersComponent } from '../customers/customers.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent {
customerId: number;
isEditing: boolean = false;

  customer: CustomerViewModelInput = {
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    gender: ''
  };
  

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private router: Router) {}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.customerId = +params['id'];
    if (this.customerId) {
      this.isEditing = true;
      this.loadCustomerDetails();
    }
  });
}

loadCustomerDetails(): void {
  this.customerService.getCustomerById(this.customerId).subscribe(data => {
    this.customer = data;
    this.customerId= 0;
  });
}

onSaveChanges(): void {
    this.customerService.updateCustomer(this.customerId, this.customer).subscribe(response => {
      console.log('Customer updated successfully.');
      this.router.navigate(['/customers']);
      this.resetForm();
    }, error => {
      console.error('Error saving changes:', error)
    });
}



  onSubmit() {
    this.customerService.addCustomer(this.customer)
      .subscribe(response => {
        console.log('Customer added successfully:', response);
        this.router.navigate(['/customers']);
        this.resetForm();
       
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

