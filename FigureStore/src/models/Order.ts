import { User } from "./Authentication";

interface OrderProduct {
    id: string;
    product: Product;
    quantity: number;
}

export interface Order {
    id: string;
    orderDate: string;
    status: string;
    amount: number;
    orderProducts: OrderProduct[];
    user: OrderUser
}

export interface OrderDTO {
    productId: string,
    quantity: number
}

interface OrderUser {
    id: string,
    firstname: string,
    lastname: string,
    phonenumber: string
    profile: string,
    address: OrderAddress
}

interface OrderAddress {
    id: string,
    address: string,
    district: string,
    province: string
}