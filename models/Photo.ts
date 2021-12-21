import { Event } from "./Event";
import { Photographer } from "./Photographer";

export interface Photo extends Image {
    event: Event
    photographer: Photographer
}

export interface Image {
    uri: string
    path: string
}