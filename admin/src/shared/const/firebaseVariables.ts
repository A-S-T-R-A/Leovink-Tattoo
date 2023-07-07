import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { db, storage } from "../../../firebase"
import {
    CollectionReference,
    DocumentData,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore"
import { Alert } from "shared/ui/CustomNotifications"
import { allLanguages } from "./languages"
import { IFiltersData } from "features/portfolioFilters/types/types"
import {
    IAddressData,
    IContactsGuide,
    IFormData,
    ISectionNames,
    ISocialMedia,
} from "pages/OtherPage/types/type"

const IS_DEV = import.meta.env.MODE === "development"

export const PORTFOLIO_PICTURES_DB = IS_DEV ? "dev_portfolio_pictures" : "portfolio_pictures"
const DATA_COLLECTION = IS_DEV ? "dev_data" : "data"
export const TATTOO_IMAGES_BUCKET = IS_DEV ? "dev_tattoo_images" : "tattoo_images"
export const DATA_BUCKET = {
    steps: "data/steps",
    services: "data/services",
    testimonials: "data/testimonials",
    artists: "data/artists",
    global: "data/global",
}
const LANGUAGE_DOCUMENT = {
    en: "english",
    ro: "romanian",
    ru: "russian",
}

export const GLOBAL_DATA = "global"

const SECTION_COLLECTION = {
    steps: "steps",
    services: "services",
    artists: "artists",
    faq: "faq",
    testimonials: "testimonials",
    layout: "layout",
    other: "other",
}

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

/* export async function copyPaste() {
    for (const lang of allLanguages) {
        const ref = collection(db, DATA_COLLECTION, LANGUAGE_DOCUMENT[lang], SECTION_COLLECTION.faq)
        const docs = await getDocs(ref)
        if (docs.empty) return
        const d = docs.docs[0].data()
        const reformattedNewData = reformatAndSortObjectValuesToArray(d) as IFaqData[]
        const newData = { ...reformattedNewData }
        newData[2].questions = Object.entries(newData[2].questions).map(([key, value]) => value)

        await addDoc(ref, newData)
    }
} */

/* const newFiltersData = {
    filtersData: {
        reset: "Reset filters",
        filters: {
            artist: [
                { key: "Dinu", label: "Dinu" },
                { key: "Katia", label: "Katia" },
                { key: "Nastia", label: "Nastia" },
            ],
            color: [{ key: "Black", label: "Black" }],
            style: [{ key: "Realism", label: "Realism" }],
            pussies: [
                { key: "Felicia", label: "Felicia" },
                { key: "Bob", label: "Bob" },
            ],
        },
    },
} */

/* export async function uploadOtherData() {
    for (const lang of allLanguages) {
        const ref = collection(
            db,
            DATA_COLLECTION,
            LANGUAGE_DOCUMENT[lang],
            SECTION_COLLECTION.other
        )
        const docs = await getDocs(ref)
        if (docs.empty) return
        const d = docs.docs[0]
        await addDoc(ref, newFiltersData)
        deleteDoc(doc(ref, d.id))
    }
} */

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
    await addDoc(ref, data)
    await deleteDoc(doc(ref, d.id))
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
                Alert.error("Error")
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

export async function fetchGlobalData() {
    const ref = doc(db, DATA_COLLECTION, GLOBAL_DATA)
    const newDoc = await getDoc(ref)
    const newData = newDoc.data()
    return newData
}

export async function updateFiltersData(filtersData: IFiltersData) {
    const ref = doc(db, DATA_COLLECTION, GLOBAL_DATA)
    await updateDoc(ref, { filtersData } as any)
}

export async function updateSocialsData(socialsData: ISocialMedia[]) {
    const ref = doc(db, DATA_COLLECTION, GLOBAL_DATA)
    await updateDoc(ref, { socialsData } as any)
}

export async function updateAddressData(addressData: IAddressData) {
    const ref = doc(db, DATA_COLLECTION, GLOBAL_DATA)
    await updateDoc(ref, { addressData } as any)
}

export async function updateContactsGuideData(contactsGuide: IContactsGuide) {
    const ref = doc(db, DATA_COLLECTION, GLOBAL_DATA)
    await updateDoc(ref, { contactsGuide } as any)
}

export async function updateFormData(formData: IFormData) {
    const ref = doc(db, DATA_COLLECTION, GLOBAL_DATA)
    await updateDoc(ref, { formData } as any)
}

export async function updateSectionNames(sectionNames: ISectionNames) {
    const ref = doc(db, DATA_COLLECTION, GLOBAL_DATA)
    await updateDoc(ref, { sectionNames: sectionNames } as any)
}
