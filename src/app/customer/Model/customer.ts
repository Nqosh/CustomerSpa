import { Pagination } from "./Pagination";

export class Customer {
    id: number = 0;
    firstName: string = "";
    surname: string = "" ;
    email: string = "";
    cellPhone : number = 0;
    invoiceTotal : number = 0
    pagination?: Pagination;
}
