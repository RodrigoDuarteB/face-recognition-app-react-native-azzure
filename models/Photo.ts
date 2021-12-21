import { Photographer } from "./Photographer";

export interface Photo {
    eventId: string
    path: string
    photographer: Photographer
    users: Array<string> 
    docId?: string
    uri?: string
}

export interface Image {
    uri: string
    path: string
}