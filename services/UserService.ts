import { where } from "firebase/firestore";
import { Photographer } from "../models/Photographer";
import { User } from "../models/User";
import { getAllDataFromCollection, getDataFromCollectionWithQuery, saveDataToCollection } from "./Service";

const usersRef = 'users'

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


export const userIsPhotographer = async (userId: string): Promise<Photographer | boolean> => {
    const res = await getDataFromCollectionWithQuery(usersRef, 
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