import { db } from "../../../firebase"
import {
    CollectionReference,
    DocumentData,
    collection,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore"

export const TATTOO_IMAGES_BUCKET = "tattoo_images"
const PORTFOLIO_PICTURES_DB = "portfolio_pictures"

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
