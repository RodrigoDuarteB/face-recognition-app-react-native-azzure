import { Photographer } from "./Photographer";

export interface Event {
    id?: string
    title: string
    description: string
    date: Date
    createdBy: string
    photographers: Array<Photographer>,
    photosCount?: number
    appearances?: number
}