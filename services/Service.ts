import { storage, store } from "../firebase.config"

const FIRESTORE = store.getFirestore()
const STORAGE = storage.getStorage()

const getCollection = (collection: string) => store.collection(FIRESTORE, collection)

export const saveDataToCollection = async (collection: string, data: any): Promise<void> => {
    await store.addDoc(getCollection(collection), data)
}

export const getAllDataFromCollection = async (collection: string): Promise<store.QueryDocumentSnapshot<store.DocumentData>[]> => {
    const res = await store.getDocs(getCollection(collection))
    return res.docs
} 

export const saveImage = async (uri: string, filename: string, folder: string): Promise<void> => {
    const imagesRef = storage.ref(STORAGE, `${folder}/${filename}`)
    const res = await fetch(uri)
    const blob = await res.blob()
    await storage.uploadBytes(imagesRef, blob)   
    
}