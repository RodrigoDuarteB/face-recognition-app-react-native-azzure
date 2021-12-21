import { getAuth, User, NextOrObserver, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { User as UserModel } from "../models/User";
import { addPersonFace, addPersonToGroup, trainGroup } from "./FaceRecognitionService";
import { saveImage } from "./Service";
import { getUserImages, saveUserData } from "./UserService";

const usersStorageRef = 'user-images'
const usersPersonGroupRef = 'event-users'

const AUTH = getAuth()

export const currentUser = AUTH.currentUser

export const onAuthStateChanges = (next: NextOrObserver<User>) => onAuthStateChanged(AUTH, next)

export const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(AUTH, email, password)  
}

const saveImages = async (userId: string, uris: string[]): Promise<string[]> => {
    var names: string[] = []
    for (const uri of uris) {
        names.push(await saveImage(uri, usersStorageRef, userId))
    }
    return names
}

export const register = async (user: UserModel): Promise<void> => {
    try {
        const { user: { uid } } = await createUserWithEmailAndPassword(AUTH, user.email, user.password!) 
        user.id = uid
        await updateProfile(AUTH.currentUser!, {
            displayName: user.name
        })
        const photoNames = await saveImages(uid, user.photos)
        user.photos = photoNames
        
        // add user to event-users on azure 
        user.personId = await addPersonToGroup(usersPersonGroupRef, `${user.name}-${uid}`)
        await saveUserData(user)
        
        //add faces to the user on azure 
        const urls = await getUserImages(photoNames)
        for (const photo of urls) {
            await addPersonFace(usersPersonGroupRef, user.personId, photo)
        }
        // train the group
        await trainGroup(usersPersonGroupRef)
    } catch (error) {
        
    }
    
}

export const logout = async (): Promise<void> => await signOut(AUTH)