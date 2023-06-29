export interface User {
    id: string,
    username: string,
    password: string
}

export interface Shop {
    id: string,
    title: string
}

export interface StoreProduct {
    id: string,
    name: string,
    price: number,
}

export interface basketItem extends Omit<StoreProduct, "id"> {
    productId: string,
    count: number
}

export interface Order {
    items: basketItem[],
    totalPrice: number
}

export enum ServerState {
    "PENDING" = "PENDING",
    "ERROR" = "ERROR",
    "SUCCESSFUL" = "SUCCESSFUL",
    "NONE" = "NONE"
}