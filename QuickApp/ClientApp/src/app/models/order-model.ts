import { CustomerViewModel } from "./customer-model";
import { ProductViewModel } from "./product-model";

export interface OrderViewModelEdit {
    id: number;
    discount: number;
    comments: string;
    customerId: number;
    cashierId: string;
}

export interface OrderViewModelList {
    id: number;
    discount: number;
    comments: string;
    customerId: number;
    cashierId: string;
    customer: CustomerViewModel;
    product: ProductViewModel;
    
}

export interface OrderDetailViewModel {
    id: number;
    product: ProductViewModel;
    customer: CustomerViewModel;
}