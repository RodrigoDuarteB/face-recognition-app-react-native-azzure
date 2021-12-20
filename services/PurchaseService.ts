import { where } from "firebase/firestore"
import { Purchase } from "../models/Purchase"
import { getDataFromCollectionWithQueries } from "./Service"

const dbRef = 'purchases'

export const getUserPurchases = async (userId: string): Promise<Array<Purchase>> => {
    const purchases: Array<Purchase> = []
    const q = where('user.id', '==', userId)
    const res = await getDataFromCollectionWithQueries(dbRef, q)
    if(res.length > 0){
        for (const purchase of res) {
            const data = purchase.data()
            //todo
        }
    }
    return purchases
}