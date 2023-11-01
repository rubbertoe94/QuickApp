

export interface CustomerViewModel {
    id: number;
    name: string;
    address: string;
    
}

export class CustomerViewModelInput {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    gender: string;
  }