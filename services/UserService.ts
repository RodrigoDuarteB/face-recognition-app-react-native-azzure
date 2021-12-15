import { where } from "firebase/firestore";
import { Photographer } from "../models/Photographer";
import { User } from "../models/User";
import { getAllDataFromCollection, getDataFromCollectionWithQuery, saveDataToCollection } from "./Service";

const user_data = 'users'

export const saveUserData = async (user: User): Promise<void> => {
    await saveDataToCollection(user_data, user)
}


export const isPhotographer = async (userId: string): Promise<Photographer | boolean> => {
    const res = await getDataFromCollectionWithQuery(user_data, 
        where('userId', '==', userId))
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
    const res = await getAllDataFromCollection(user_data)
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