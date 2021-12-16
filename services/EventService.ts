import { where } from "firebase/firestore";
import { Event } from "../models/Event";
import { getDataFromCollectionWithQuery, saveDataToCollection } from "./Service";

export const saveEvent = async (event: Event) => {
    await saveDataToCollection('events', event)
}

export const getUserEvents = async (userId: string): Promise<Event[]> => {
    const events: Event[] = []
    const res = await getDataFromCollectionWithQuery('events', 
    where('createdBy', '==', userId))
    res.map(ev => {
        const data = ev.data()
        events.push({
            id: ev.id,
            createdBy: data.createdBy,
            date: data.date.toDate(),
            description: data.description,
            title: data.title,
            photographers: data.photographers,
            photos: data.photos ? data.photos : []
        })
    })
    return events
}


export const getUserAppearEvents = async (userId: string): Promise<Event[]> => {
    const events: Event[] = []
    const res = await getDataFromCollectionWithQuery('events', 
    where('appearances', 'array-contains', {
        userId
    }))
    res.map(ev => {
        const data = ev.data()
        events.push({
            id: ev.id,
            createdBy: data.createdBy,
            date: data.date.toDate(),
            description: data.description,
            title: data.title,
            photographers: data.photographers,
            photos: data.photos ? data.photos : []
        })
    })
    return events
}

export const getUserContractedEvents = async (userId: string): Promise<Event[]> => {
    const events: Event[] = []
    const res = await getDataFromCollectionWithQuery('events', 
    where('photographers', 'array-contains', userId))
    res.map(ev => {
        const data = ev.data()
        events.push({
            id: ev.id,
            createdBy: data.createdBy,
            date: data.date.toDate(),
            description: data.description,
            title: data.title,
            photographers: data.photographers,
            photos: data.photos ? data.photos : []
        })
    })
    return events
}