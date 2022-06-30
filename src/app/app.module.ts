import { AlertifyService } from './customer/services/alertify.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CustomerAddComponent } from './customer/customerAdd/customerAdd.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerEditComponent } from './customer/customerEdit/customerEdit.component';
import { CustomerViewComponent } from './customer/customerView/customerView.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [	
    AppComponent,
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerViewComponent
   ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    PaginationModule.forRoot()
  ],
  providers: [
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
