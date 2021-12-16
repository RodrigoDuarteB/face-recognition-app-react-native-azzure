import { User } from "./User";

interface Appearence {
    user: User,
    appearences: number
}

export interface Event {
    id?: string
    title: string
    description: string
    date: Date
    createdBy: string
    photographers: string[]
    photos?: string[]
    appearances?: Appearence[]
}