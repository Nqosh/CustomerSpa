import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pagination, PaginationResult } from './Model/Pagination';

import { AlertifyService } from './services/alertify.service';
import { Customer } from './Model/customer';
import { CustomerService } from './services/customer.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}
const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

closeResult = '';
// @ViewChild('editForm') editForm: NgForm ={} as NgForm;
// @ViewChild('customerForm') addcomponent: CustomerAddComponent = {} as CustomerAddComponent
customers?: Customer[] = [];
customersForSearchObj?: Customer[] = [];
customer? : Customer = {} as Customer;
customerParams: any = {};
pagination?: Pagination ;
searchTerm?: string;
collectionSize: number = 0;


  constructor(private router: Router, private modalService: NgbModal, private customerService: CustomerService, private alertify: AlertifyService) { }

  ngOnInit() {

    this.customerParams.pageNumber = 1;
    this.customerParams.pageSize = 10;
    
    this.loadCustomers();
}

pageChanged(event: any): void {
  // this.pagination?.currentPage = event.page;
}

search(searchObject: any): void {
  this.customers = this.customersForSearchObj?.filter((val) => val.firstName?.toLowerCase().includes(searchObject.value));
  this.collectionSize = this.customers?.length!;
}

RouteToCreateCustomer() {
  this.router.navigate(['AddCustomer']);
}

loadCustomers() {
  this.customerService.getCustomers(this.customerParams)
  .subscribe(
    (res: PaginationResult<Customer[]>) => {
      this.customers = res.result;
      this.customersForSearchObj =  res.result;
      this.collectionSize = this.customers?.length!;
      this.pagination = res.pagination;
    }, error => {
      alert(error);  
    });
  }

deleteCustomerConfirmation(customer: any) {
  this.modalService.open(MODALS['deleteModal'],
    {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {
      this.deleteCustomer(customer);
    },
      (reason) => {});
}
  
  deleteCustomer(customer: any) {
    this.customerService.deleteCustomer(customer.id).subscribe(res => {  
      alert("Deleted successfully !!!");  
      this.loadCustomers();  
    })  
  }
}

 
