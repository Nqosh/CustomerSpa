import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Customer } from '../Model/customer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResult } from '../Model/Pagination';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = environment.apiUrl + 'customer/';

constructor(private http: HttpClient) { }

getCustomers(customerParams: any = {}): Observable<PaginationResult<Customer[]>> {

  const paginationResult: PaginationResult<Customer[]> = new PaginationResult<Customer[]>();

  let params = new HttpParams();
  if (customerParams != null) {
    params = params.append('pageNumber', customerParams.pageNumber);
    params = params.append('pageSize', customerParams.pageSize);
  }

  return this.http.get<Customer[]>(this.baseUrl + 'list', { observe: 'response', params}).
  pipe(
    map(response => {
      paginationResult.result = response.body!;
      if(response.headers.get('Pagination') != null) {
      paginationResult.pagination = JSON.parse (response.headers.get('pagination')!);

      }
       return paginationResult;
    })
  );
}

createCustomer(customer: Customer) {
  return this.http.post(this.baseUrl + 'create', customer, {});
}

getCustomer(id: number): Observable<Customer> {
  return this.http.get<Customer>(this.baseUrl + id);
}

updateCustomer(id: number, customer: Customer) {
  return this.http.put(this.baseUrl + id, customer);
}

deleteCustomer(id: number) {
return this.http.delete(this.baseUrl + id);
}

}


