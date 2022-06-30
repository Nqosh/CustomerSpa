import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AlertifyService } from '../services/alertify.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customerView',
  templateUrl: './customerView.component.html',
  styleUrls: ['./customerView.component.css']
})
export class CustomerViewComponent implements OnInit {

  customerId: any;
  customer : any= [];

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
      alert('problem retrieving the customer');
     }
    });
  }
}
