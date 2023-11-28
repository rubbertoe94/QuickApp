import { CustomerViewModel } from "./customer-model";
import { ProductViewModel } from "./product-model";

export class OrderViewModel {
    id: number;
    discount: number;
    comments: string;
    customerId: number;
    cashierId: string;
    customer: CustomerViewModel;
    product: ProductViewModel;

   // constructor(){this.product = new ProductViewModel()}
}



export class OrderDetailViewModel {
    id: number;
    product: ProductViewModel;
    customer: CustomerViewModel;
}