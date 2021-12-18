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

export const saveImage = async (uri: string, filename: string, folder: string): Promise<void> => {
    const imagesRef = ref(STORAGE, `${folder}/${filename}`)
    const res = await fetch(uri)
    const blob = await res.blob()
    await uploadBytes(imagesRef, blob)  
}

export const getImageUrl = async (folder: string, filename: string): Promise<string> => {
    const reference = ref(STORAGE, `${folder}/${filename}`)
    return await getDownloadURL(reference)
}

export const getDataFromCollectionWithQueries = async (collection: string, ...qr: QueryConstraint[]): Promise<QueryDocumentSnapshot<DocumentData>[]> => {
    const q = query(getCollection(collection), ...qr)
    const res = await getDocs(q) 
    return res.docs    
}