import { auth } from "../firebase.config";
import { User } from "../models/User";
import { saveImage } from "./Service";
import { saveUserData } from "./UserService";

const AUTH = auth.getAuth()

export const currentUser = AUTH.currentUser

export const onAuthStateChanged = (next: auth.NextOrObserver<auth.User>) => auth.onAuthStateChanged(AUTH, next)

export const login = async (email: string, password: string): Promise<void> => {
    await auth.signInWithEmailAndPassword(AUTH, email, password)  
}

const saveImages = async (user: User): Promise<string[]> => {
    var names: string[] = []
    var urls = user.photos
    for(let i=0; i<urls.length; i++){
        const name = user.id! + (i + 1)
        names.push(name)
        await saveImage(urls[i], name, 'user-images')
    }
    return names
}

export const register = async (user: User): Promise<void> => {
    const { user: { uid } } = await auth.createUserWithEmailAndPassword(AUTH, user.email, user.password!) 
    user.id = uid
    await auth.updateProfile(AUTH.currentUser!, {
        displayName: user.name
    })
    const photoNames = await saveImages(user)
    user.photos = photoNames
    await saveUserData(user)
}

export const logout = async (): Promise<void> => await auth.signOut(AUTH)