import { CustomerViewModel } from "./customer-model";
import { ProductViewModel } from "./product-model";

export class OrderViewModel {
    id: number;
    discount: number;
    comments: string;
    customerId: number;
    productId: number;
    cashierId: string;
    
}



export class OrderDetailViewModel {
    id: number;
    product: ProductViewModel;
    customer: CustomerViewModel;
}