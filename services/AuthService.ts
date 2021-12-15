import { getAuth, User, NextOrObserver, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { User as UserModel } from "../models/User";
import { saveImage } from "./Service";
import { saveUserData } from "./UserService";

const AUTH = getAuth()

export const currentUser = AUTH.currentUser

export const onAuthStateChanges = (next: NextOrObserver<User>) => onAuthStateChanged(AUTH, next)

export const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(AUTH, email, password)  
}

const saveImages = async (user: UserModel): Promise<string[]> => {
    var names: string[] = []
    var urls = user.photos
    for(let i=0; i<urls.length; i++){
        const name = user.id! + (i + 1)
        names.push(name)
        await saveImage(urls[i], name, 'user-images')
    }
    return names
}

export const register = async (user: UserModel): Promise<void> => {
    const { user: { uid } } = await createUserWithEmailAndPassword(AUTH, user.email, user.password!) 
    user.id = uid
    await updateProfile(AUTH.currentUser!, {
        displayName: user.name
    })
    const photoNames = await saveImages(user)
    user.photos = photoNames
    await saveUserData(user)
}

export const logout = async (): Promise<void> => await signOut(AUTH)