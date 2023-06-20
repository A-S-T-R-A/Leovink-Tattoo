import { db } from "../../../firebase"
import {
    CollectionReference,
    DocumentData,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore"

export const TATTOO_IMAGES_BUCKET = "tattoo_images"
export const PORTFOLIO_PICTURES_DB = "portfolio_pictures"

export const portfolioPicturesRef = collection(db, PORTFOLIO_PICTURES_DB)

export const getFirestoreDocumentByFileId = (fileId: string) => {
    return doc(db, PORTFOLIO_PICTURES_DB, fileId)
}

export const getFirestoreDocumentById = async (
    id: number,
    collectionRef: CollectionReference<DocumentData>
) => {
    const q = query(collectionRef, where("id", "==", id))
    const d = await getDocs(q)
    if (d.empty) throw new Error()
    return d.docs[0]
}

export async function getImagesDoc() {
    const ref = collection(db, PORTFOLIO_PICTURES_DB)
    const docs = await getDocs(ref)
    if (docs.empty) return
    return docs.docs[0]
}

export async function rewriteImagesDoc(data: any) {
    const d = await getImagesDoc()
    if (!d) return
    const ref = collection(db, PORTFOLIO_PICTURES_DB)
    await deleteDoc(doc(db, PORTFOLIO_PICTURES_DB, d.id))
    await addDoc(ref, data)
}

export function reformatObjectValuesToArray(obj: any): any[] {
    return Object.values(obj) as any[]
}

export function sortObjectData(obj: any): any {
    const sortedKeys = Object.keys(obj).sort((a, b) => Number(a) - Number(b))
    const sortedObject: any = {}

    for (const key of sortedKeys) {
        sortedObject[key] = { id: [key], ...obj[key] }
    }

    return sortedObject
}
