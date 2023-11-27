import { CustomerViewModel } from "./customer-model";

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
    
}