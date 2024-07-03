
export interface CartItem {
    id: string;
    quantity: number;
    product: Product;
}

export interface Cart {
    id: string;
    items: CartItem[];
}

export interface AddToCart {
    cartId: string;
    product: Product;
    quantity: number;
}