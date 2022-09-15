import { getDocs, getFirestore, query, collection, addDoc, QueryDocumentSnapshot, DocumentData, QueryConstraint, doc, updateDoc, DocumentReference, deleteDoc, getDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage, store } from "../firebase"

const FIRESTORE = store
const STORAGE = storage

const getCollection = (col: string) => collection(FIRESTORE, col)

export const saveDataToCollection = async (collection: string, data: any): Promise<DocumentReference<any>> => {
    const res = await addDoc(getCollection(collection), data)
    return res
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


export const updateDocument = async (collection: string, id: string, data: any) => {
    const docRef = doc(FIRESTORE, collection, id)
    await updateDoc(docRef, data)
}


export const removeImage = async (fullPath: string): Promise<void> => {
    const imageRef = ref(STORAGE, fullPath)
    await deleteObject(imageRef)
}


export const removeDocument = async (collection: string, id: string) => {
    const docRef = doc(FIRESTORE, collection, id)
    await deleteDoc(docRef)
}


export const getDocFromCollection = async (collection: string, id: string) => {
    const docRef = doc(FIRESTORE, collection, id)
    return await getDoc(docRef)
}
