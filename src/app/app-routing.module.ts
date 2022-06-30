import { RouterModule, Routes } from '@angular/router';

import { CustomerAddComponent } from './customer/customerAdd/customerAdd.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerEditComponent } from './customer/customerEdit/customerEdit.component';
import { CustomerViewComponent } from './customer/customerView/customerView.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full'},
  { path: 'Home', component: CustomerComponent },
  { path: 'ViewCustomer/:customerId', component: CustomerViewComponent },
  { path: 'AddCustomer', component: CustomerAddComponent },
  { path: 'EditCustomer/:customerId', component: CustomerEditComponent}
];
 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
