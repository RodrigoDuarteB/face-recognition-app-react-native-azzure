import { Event } from "./Event";
import { Photographer } from "./Photographer";

export interface Photo {
    uri: string
    digitalCost: string
    printedCost: string
    event: Event
    photographer: Photographer
}

export interface Image {
    uri: string
    path: string
}