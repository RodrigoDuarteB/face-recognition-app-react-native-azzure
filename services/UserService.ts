import { where } from "firebase/firestore";
import { Photographer } from "../models/Photographer";
import { User } from "../models/User";
import { getAllDataFromCollection, getDataFromCollectionWithQueries, getImageUrl, saveDataToCollection } from "./Service";

const usersRef = 'users'
const usersStorageRef = 'user-images'

export const saveUserData = async (user: User): Promise<void> => {
    let data: any = {
        id: user.id,
        email: user.email,
        name: user.name,
        photos: user.photos
    }
    if(user.photographer){
        data = {
            ...data,
            photographer: user.photographer
        }
    }
    await saveDataToCollection(usersRef, data)
}

const getUserImages = async (photoNames: string[]): Promise<string[]> => {
    const images: string[] = []
    for(const name of photoNames){
        images.push(await getImageUrl(usersStorageRef, name))
    }
    return images
}

export const getUser = async (userId: string): Promise<User | null> => {
    const res = await getDataFromCollectionWithQueries(usersRef,
        where('id', '==', userId))
    if(res.length > 0){
        const firstUser = res[0].data()
        let data: User = {
            id: firstUser.id,
            email: firstUser.email,
            name: firstUser.name,
            photos: await getUserImages(firstUser.photos)
        }
        if(firstUser.photographer){
            data = {
                ...data, 
                photographer: firstUser.photographer
            }
        }
        return data
    }
    return null
}


export const userIsPhotographer = async (userId: string): Promise<Photographer | boolean> => {
    const res = await getDataFromCollectionWithQueries(usersRef, 
        where('id', '==', userId))
    if(res.length > 0){
        const userData = res[0].data()
        if(userData.photographer){
            return {
                contractCost: userData.photographer.contractCost,
                digitalCost: userData.photographer.digitalCost,
                printedCost: userData.photographer.printedCost
            }
        }
    }
    return false
}


export const getPhotographers = async (): Promise<Photographer[]> => {
    const photographers: Photographer[] = []
    const res = await getAllDataFromCollection(usersRef)
    res.map(el => {
        const data = el.data()
        if(data.photographer){
            photographers.push({
                ...data.photographer,
                user: {
                    id: data.id,
                    name: data.name
                }    
            })
        }
    })    
    return photographers
}