export interface Invoice {
    id: number;
    number: number;
    issueDate: Date;
    userName: string;
    subtotal: number;
    tax: number;
    total: number;
    discount: number;
    paymentMethod: string;
    status: boolean; 
}