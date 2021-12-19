import { getDocs, getFirestore, query, collection, addDoc, QueryDocumentSnapshot, DocumentData, QueryConstraint } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const FIRESTORE = getFirestore()
const STORAGE = getStorage()

const getCollection = (col: string) => collection(FIRESTORE, col)

export const saveDataToCollection = async (collection: string, data: any): Promise<void> => {
    await addDoc(getCollection(collection), data)
}

export const getAllDataFromCollection = async (collection: string): Promise<QueryDocumentSnapshot<DocumentData>[]> => {
    const res = await getDocs(getCollection(collection))
    return res.docs
} 

export const saveImage = async (uri: string, folder: string, subfolder?: string): Promise<string> => {
    const splitted = uri.split('/')
    const imageName = splitted[splitted.length - 1]
    const url = subfolder ? `${folder}/${subfolder}/${imageName}` : `${folder}/${imageName}`
    const imageRef = ref(STORAGE, url)
    const res = await fetch(uri)
    const blob = await res.blob()
    await uploadBytes(imageRef, blob)
    return imageRef.fullPath
}

export const getImageUrl = async (fullPath: string): Promise<string> => {
    const reference = ref(STORAGE, fullPath)
    return await getDownloadURL(reference)
}

export const getDataFromCollectionWithQueries = async (collection: string, ...qr: QueryConstraint[]): Promise<QueryDocumentSnapshot<DocumentData>[]> => {
    const q = query(getCollection(collection), ...qr)
    const res = await getDocs(q) 
    return res.docs    
}