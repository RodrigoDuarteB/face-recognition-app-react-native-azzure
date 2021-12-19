import { where } from "firebase/firestore";
import { Event } from "../models/Event";
import { getDataFromCollectionWithQueries, getImageUrl, saveDataToCollection } from "./Service";

const dbRef = 'events'
const storageRef = 'event-images'


export const saveEvent = async (event: Event) => {
    await saveDataToCollection(dbRef, event)
}

export const getUserEvents = async (userId: string): Promise<Event[]> => {
    let events: Event[] = []
    const res = await getDataFromCollectionWithQueries(dbRef, 
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
            photos: data.photos
        })
    })
    return events
}


export const getUserAppearEvents = async (userId: string): Promise<Event[]> => {
    const events: Event[] = []
    const res = await getDataFromCollectionWithQueries(dbRef, 
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
    const res = await getDataFromCollectionWithQueries(dbRef, 
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

export const getEventPhotos = async (photoNames: string[]): Promise<string[]> => {
    const images: string[] = []
    for (const name of photoNames) {
        images.push(await getImageUrl(name))
    }
    return images
}