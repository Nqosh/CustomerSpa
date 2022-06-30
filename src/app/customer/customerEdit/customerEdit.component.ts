import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertifyService } from '../services/alertify.service';
import { Customer } from '../Model/customer';
import { CustomerService } from '../services/customer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customerEdit',
  templateUrl: './customerEdit.component.html',
  styleUrls: ['./customerEdit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customer : Customer = new Customer();  
  
  @ViewChild("customerForm")
  customerForm!: NgForm;

  isSubmitted: boolean = false;
  customerId: any;
  
  constructor(private route: ActivatedRoute, private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['customerId'];
    this.getCustomer();
  }

  getCustomer() {
    this.customerService.getCustomer(this.customerId).subscribe((data) =>{
     if(data) {
      this.customer = Object.assign({},data);;
     }
     else {
      alert('Problem retrieving the customer');
     }
    });
  }

  updateCustomer(regForm:NgForm) {
    this.customerService.updateCustomer(this.customer?.id as number, this.customer as Customer)
    .subscribe(next => {
      alert('Customer updated successfully');
      this.customerForm?.reset(this.customer);   
     }, error => {
     alert(error);
     });
  }

}
