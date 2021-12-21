import { arrayRemove, arrayUnion, updateDoc, where } from "firebase/firestore";
import { Event } from "../models/Event";
import { Photo } from "../models/Photo";
import { Photographer } from "../models/Photographer";
import { detect, identify } from "./FaceRecognitionService";
import { getAllDataFromCollection, getDataFromCollectionWithQueries, getDocFromCollection, getImageUrl, removeDocument, removeImage, saveDataToCollection, saveImage, updateDocument } from "./Service";

const dbRef = 'events'
const storageRef = 'event-images'
const usersPersonGroupRef = 'event-users' 

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
            photosCount: await getEventPhotosCount(ev.id),
            appearances: await getUserAppearancesOnEvent(ev.id, userId)
        })
    }
    return events
}


export const getUserAppearEvents = async (userId: string): Promise<Event[]> => {
    const events: Event[] = []
    const res = await getAllDataFromCollection(storageRef)
    for (const eventPhotos of res) {
        const data = eventPhotos.data()
        const users: Array<string> = data.users
        if(users.includes(userId)){
            const event = await getDocFromCollection(dbRef, data.eventId)
            const eventData = event.data()
            events.push({
                id: event.id,
                createdBy: eventData!.createdBy,
                date: eventData!.date.toDate(),
                description: eventData!.description,
                title: eventData!.title,
                photographers: eventData!.photographers,
                photosCount: await getEventPhotosCount(event.id),
                appearances: await getUserAppearancesOnEvent(event.id, userId)
            })
        }
    }
    return events
}


export const getUserContractedEvents = async (userId: string): Promise<Event[]> => {
    const events: Event[] = []
    const res = await getAllDataFromCollection(dbRef)
    for (const ev of res) {
        const data = ev.data()
        const photographers: Array<Photographer> = data.photographers
        const isPart = photographers.filter(ph => ph.user?.id === userId).length > 0
        if(isPart){
            events.push({
                id: ev.id,
                createdBy: data.createdBy,
                date: data.date.toDate(),
                description: data.description,
                title: data.title,
                photographers: data.photographers,
                photosCount: await getEventPhotosCount(ev.id)
            })
        }
    }
    return events
}


export const getEventPhotos = async (eventId: string, paths?: string[]): Promise<Array<Photo>> => {
    const images: Array<Photo> = []
    const q = where('eventId', '==', eventId)
    const res = await getDataFromCollectionWithQueries(storageRef, q)
    for (const photo of res) {
        const data = photo.data()
        images.push({
            docId: photo.id,
            eventId,
            path: data.path,
            photographer: data.photographer,
            users: data.users,
            uri: await getImageUrl(data.path)
        })
    }
    return images
}


const getUserFromPersonId = async (personId: string) => {
    const q = where('personId', '==', personId)
    const res = await getDataFromCollectionWithQueries('users', q)
    if(res.length > 0){
        const user = res[0].data()
        return user.id
    }
    return ''
}


const recognizeOnPhoto = async (photo: Photo) => {
    const uri = await getImageUrl(photo.path)
    const detected = await detect(uri)
    const faceIds = detected.map(e => e.faceId)
    const identified = await identify(usersPersonGroupRef, faceIds)
    for(const id of identified){
        if(id.candidates.length > 0){
            const { personId } = id.candidates[0]
            const userId = await getUserFromPersonId(personId)
            await updateDocument('event-images', photo.docId!, {
                users: arrayUnion(userId)
            })
        }
    }
}


export const saveEventPhotos = async (eventId: string, photographer: Photographer, paths: string[]): Promise<void> => {
    for (const uri of paths) {
        const photo: Photo = {
            eventId,
            path: await saveImage(uri, storageRef, eventId),
            photographer,
            users: []
        }
        const res = await saveDataToCollection(storageRef, photo)
        photo.docId = res.id
        await recognizeOnPhoto(photo)
    }
}


export const removeEventPhoto = async (photo: Photo): Promise<void> => {
    await removeDocument(storageRef, photo.docId!)
    await removeImage(photo.path)
}


const getEventPhotosCount = async (eventId: string) => {
    const q = where('eventId', '==', eventId)
    const res = await getDataFromCollectionWithQueries(storageRef, q)
    return res.length
}


const getUserAppearancesOnEvent = async (eventId: string, userId: string) => {
    let count = 0
    const q = where('eventId', '==', eventId)
    const res = await getDataFromCollectionWithQueries(storageRef, q)
    for (const eventPhoto of res) {
        const data = eventPhoto.data()
        const users: string[] = data.users
        if (users.includes(userId)){
            count++
        }
    }
    return count
}