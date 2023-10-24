import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer-service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customerId: number;
  customerDetails: any ={}; 

  constructor(private route: ActivatedRoute, private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customerId = +params['id'];
      this.loadCustomerDetails();
    });
  }

  loadCustomerDetails(): void {
    this.customerService.getCustomerById(this.customerId).subscribe(data => {
      this.customerDetails = data || {};
    });
  }

  editCustomer(): void {
    this.router.navigate(['/customer-form', this.customerId]);
  }
}