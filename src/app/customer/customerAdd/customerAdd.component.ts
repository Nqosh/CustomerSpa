import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Customer } from '../Model/customer';
import { CustomerService } from '../services/customer.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerAdd',
  templateUrl: './customerAdd.component.html',
  styleUrls: ['./customerAdd.component.css']
})
export class CustomerAddComponent implements OnInit {

  customer : Customer = new Customer();  
  @ViewChild("customerForm")
  customerForm!: NgForm;
  isSubmitted: boolean = false;

  constructor(private customerService: CustomerService, private router:Router) { }

  ngOnInit() {
  }

  AddCustomer(regForm:NgForm){    
    this.isSubmitted = true;
    this.customer = new Customer();  
    this.customer.firstName= regForm.value.firstName;  
    this.customer.surname= regForm.value.surname;  
    this.customer.email= regForm.value.email;  
    this.customer.cellPhone= regForm.value.cellPhone; 
    this.customer.invoiceTotal = regForm.value.invoiceTotal; 
      
  this.customerService.createCustomer(this.customer).subscribe(res=>{  
    alert('Customer Added successfully');  
    this.RouteToCustomerList();
    });
  }
  RouteToCustomerList() {
    this.router.navigate(['Home']);
  }
}