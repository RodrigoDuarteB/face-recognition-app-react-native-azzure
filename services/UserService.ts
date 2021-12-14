import { User } from "../models/User";
import { saveDataToCollection } from "./Service";

const user_data = 'user_data'

export const saveUserData = async (user: User): Promise<void> => {
    var data: any = {
        user_id: user.id,
        photos: user.photos
    }
    if(user.photographer)
        data = {...data, photographer: user.photographer}
    await saveDataToCollection(user_data, data)
}