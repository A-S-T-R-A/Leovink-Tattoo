import { db } from "../../../firebase"
import { addDoc, collection, getDocs } from "firebase/firestore"

const PORTFOLIO_PICTURES_DB = "portfolio_pictures"
const DATA_COLLECTION = "data"

const DATA_BUCKET = "data"
const DATA_STEPS = "steps"

const LANGUAGE_DOCUMENT = {
    en: "english",
    ro: "romanian",
    ru: "russian",
}

export const SECTION_COLLECTION = {
    steps: "steps",
    services: "services",
    artists: "artists",
}

function reformatObjectValuesToArray(obj: any): any[] {
    return Object.values(obj) as any[]
}

export async function fetchSectionData(
    language: keyof typeof LANGUAGE_DOCUMENT,
    section: keyof typeof SECTION_COLLECTION
) {
    const ref = collection(
        db,
        DATA_COLLECTION,
        LANGUAGE_DOCUMENT[language],
        SECTION_COLLECTION[section]
    )
    const docs = await getDocs(ref)

    if (docs.empty) return
    const newData = reformatObjectValuesToArray(docs.docs[0].data())
    return newData
}

export const portfolioPicturesRef = collection(db, PORTFOLIO_PICTURES_DB)

export interface IStepData {
    img: string
    title: string
    description: string
}

export interface IServicesData {
    title: string
    description: string
    images: string[]
}

export interface IArtistsData {
    name: string
    description: string
    specialization: string
    img: string
}

export function addData(lang: keyof typeof LANGUAGE_DOCUMENT) {
    const ref = collection(db, DATA_COLLECTION, LANGUAGE_DOCUMENT[lang], SECTION_COLLECTION.artists)

    const data = {
        0: {
            img: "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fportfolio%2Fa1.jpg?alt=media&token=de2a8522-7b60-433d-982b-1efe3b0ee558",
            name: "Rus Hector",
            specialization: "Specializes in caligraphy and fine line",
            description: `Hector's incredible talent, attention to details, and precise line work, combined with an increadibly 
          positive attitude, make him one of the shop's most sought-after artists.`,
        },
        1: {
            img: "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fportfolio%2Fa2.jpg?alt=media&token=e70d1846-9f11-41d5-aaba-964281381a7c",
            name: "Rus Vasia",
            specialization: "Specializes in caligraphy and fine line",
            description: `Hector's incredible talent, attention to details, and precise line work, combined with an increadibly 
          positive attitude, make him one of the shop's most sought-after artists.`,
        },
        2: {
            img: "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fportfolio%2Fa3.jpg?alt=media&token=3286aa33-7760-4aad-b09a-1a2db8e11842",
            name: "Rus Petia",
            specialization: "Specializes in caligraphy and fine line",
            description: `Hector's incredible talent, attention to details, and precise line work, combined with an increadibly 
          positive attitude, make him one of the shop's most sought-after artists.`,
        },
        3: {
            img: "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fportfolio%2Fa4.jpg?alt=media&token=2c51e0da-6cd3-4e7f-9eb8-a5458b6d9eae",
            name: "Rus Kolia",
            specialization: "Specializes in caligraphy and fine line",
            description: `Hector's incredible talent, attention to details, and precise line work, combined with an increadibly 
          positive attitude, make him one of the shop's most sought-after artists.`,
        },
    }

    addDoc(ref, data)
}
