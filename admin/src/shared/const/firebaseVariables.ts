import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { db, storage } from "../../../firebase"
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
export const DATA_BUCKET = {
    steps: "data/steps",
    services: "data/services",
    testimonials: "data/testimonials",
}
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

export function reformatArrayToObject(arr: any[]) {
    const obj: any = {}
    arr.forEach((item, index) => {
        const newItem = { ...item }
        delete newItem.id
        obj[index] = newItem
    })
    return obj
}

export function reformatAndSortObjectValuesToArray(obj: any): any[] {
    const sortedObject = sortObjectData(obj)
    return Object.values(sortedObject) as any[]
}

export function sortObjectData(obj: any): any {
    const sortedKeys = Object.keys(obj).sort((a, b) => Number(a) - Number(b))
    const sortedObject: any = {}

    for (const key of sortedKeys) {
        sortedObject[key] = { id: +key, ...obj[key] }
    }

    return sortedObject
}

const LANGUAGE_DOCUMENT = {
    en: "english",
    ro: "romanian",
    ru: "russian",
}

const SECTION_COLLECTION = {
    steps: "steps",
    services: "services",
    artists: "artists",
    faq: "faq",
    testimonials: "testimonials",
    layout: "layout",
    other: "other",
}

const DATA_COLLECTION = "data"

export async function fetchSectionData(
    language: keyof typeof LANGUAGE_DOCUMENT,
    section: keyof typeof SECTION_COLLECTION,
    raw?: boolean
) {
    const ref = collection(
        db,
        DATA_COLLECTION,
        LANGUAGE_DOCUMENT[language],
        SECTION_COLLECTION[section]
    )
    const docs = await getDocs(ref)

    if (docs.empty) return
    const newData = docs.docs[0].data()
    const reformattedNewData = reformatAndSortObjectValuesToArray(newData)
    const data = raw ? newData : reformattedNewData
    return data
}

export async function updateSectionData(
    language: keyof typeof LANGUAGE_DOCUMENT,
    section: keyof typeof SECTION_COLLECTION,
    data: any
) {
    const ref = collection(
        db,
        DATA_COLLECTION,
        LANGUAGE_DOCUMENT[language],
        SECTION_COLLECTION[section]
    )
    const docs = await getDocs(ref)
    if (docs.empty) return
    const d = docs.docs[0]
    await deleteDoc(doc(ref, d.id))
    await addDoc(ref, data)
}

export async function uploadImageToBucket(file: any, bucketPath: string): Promise<string> {
    const fileRef = ref(storage, bucketPath)
    const uploadTask = uploadBytesResumable(fileRef, file)

    return await new Promise((res, rej) => {
        uploadTask.on(
            "state_changed",
            snapshot => {
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused")
                        break
                    case "running":
                        console.log("Upload is running")
                        break
                }
            },
            error => {
                alert("Error")
                rej(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url: string) => res(url))
            }
        )
    })
}

export function getImageNameByUrl(url: string): string {
    const startIndex = url.lastIndexOf("%2F") + 3
    const endIndex = url.indexOf("?")
    const extractedParam = url.substring(startIndex, endIndex)

    return extractedParam
}

export async function deleteImageFromBucket(oldImgUrl: string, path: string) {
    const imgName = getImageNameByUrl(oldImgUrl)
    const imgRef = ref(storage, `${path}/${imgName}`)
    await deleteObject(imgRef)
}
