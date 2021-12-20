import { Event } from "./Event";
import { Photo } from "./Photo";
import { User } from "./User";

export interface Purchase {
    id?: string
    detail: Array<CartItem>
    total: number
    event: Event
    type: string
    user: User,
    date: Date
}

export interface CartItem {
    photo: Photo
}

export interface Cart {
    items: Array<CartItem>
}