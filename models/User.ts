import { Photographer } from "./Photographer";

export interface User {
    id?: string
    email: string
    password?: string
    name: string,
    photos: string[],
    photographer?: Photographer
}