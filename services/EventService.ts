import { arrayRemove, arrayUnion, where } from "firebase/firestore";
import { Event } from "../models/Event";
import { Image } from "../models/Photo";
import { getDataFromCollectionWithQueries, getImageUrl, removeImage, saveDataToCollection, saveImage, updateDocument } from "./Service";

const dbRef = 'events'
const storageRef = 'event-images'

export const saveEvent = async (event: Event) => {
    await saveDataToCollection(dbRef, event)
}


export const getUserEvents = async (userId: string): Promise<Event[]> => {
    let events: Event[] = []
    const res = await getDataFromCollectionWithQueries(dbRef, 
    where('createdBy', '==', userId))
    for (const ev of res) {
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
    }
    return events
}


export const getUserAppearEvents = async (userId: string): Promise<Event[]> => {
    const events: Event[] = []
    const res = await getDataFromCollectionWithQueries(dbRef, 
    where('appearances', 'array-contains', {
        userId
    }))
    for (const ev of res) {
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
    }
    return events
}


export const getUserContractedEvents = async (userId: string): Promise<Event[]> => {
    const events: Event[] = []
    const res = await getDataFromCollectionWithQueries(dbRef, 
    where('photographers', 'array-contains', userId))
    for (const ev of res) {
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
    }
    return events
}


export const getEventPhotos = async (photoNames: string[]): Promise<Array<Image>> => {
    const images: Array<Image> = []
    for (const name of photoNames) {
        images.push({
            uri: await getImageUrl(name),
            path: name
        })
    }
    return images
}


export const saveEventPhotos = async (eventId: string, paths: string[]): Promise<void> => {
    const photos: string[] = []
    for (const uri of paths) {
        photos.push(await saveImage(uri, storageRef, eventId))
    }
    await updateDocument(dbRef, eventId, {
        photos: arrayUnion(...photos)
    })
}


export const removeEventPhoto = async (eventId: string, path: string): Promise<void> => {
    await updateDocument(dbRef, eventId, {
        photos: arrayRemove(path)
    })
    await removeImage(path)
}