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
    faq: "faq",
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

export interface IFaqData {
    title: string
    questions: { question: string; answer: string }[]
}

export function addData(lang: keyof typeof LANGUAGE_DOCUMENT) {
    const ref = collection(
        db,
        DATA_COLLECTION,
        LANGUAGE_DOCUMENT[lang],
        SECTION_COLLECTION.services
    )

    const data = {
        0: {
            title: "Rus Tattoo",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sed quidem molestias voluptates reprehenderit totam incidunt doloribus eius nemo maiores.",
            images: [
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv1.jpg?alt=media&token=295a6d04-96c5-4fa9-8875-3a98735fe054",
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv2.jpg?alt=media&token=d7b245cf-2ba7-4ec6-a306-255ede668b86",
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv3.jpg?alt=media&token=a25debd7-161e-4331-9035-1ac9ecfd17d5",
            ],
        },
        1: {
            title: "Rus Fixing a bad tattoo",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sed quidem molestias voluptates reprehenderit totam incidunt doloribus eius nemo maiores.",
            images: [
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv1.jpg?alt=media&token=295a6d04-96c5-4fa9-8875-3a98735fe054",
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv2.jpg?alt=media&token=d7b245cf-2ba7-4ec6-a306-255ede668b86",
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv3.jpg?alt=media&token=a25debd7-161e-4331-9035-1ac9ecfd17d5",
            ],
        },
        2: {
            title: "Rus Cover up Tattoo",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sed quidem molestias voluptates reprehenderit totam incidunt doloribus eius nemo maiores.",
            images: [
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv1.jpg?alt=media&token=295a6d04-96c5-4fa9-8875-3a98735fe054",
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv2.jpg?alt=media&token=d7b245cf-2ba7-4ec6-a306-255ede668b86",
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv3.jpg?alt=media&token=a25debd7-161e-4331-9035-1ac9ecfd17d5",
            ],
        },
        3: {
            title: "Rus Covering Scars",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sed quidem molestias voluptates reprehenderit totam incidunt doloribus eius nemo maiores.",
            images: [
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv1.jpg?alt=media&token=295a6d04-96c5-4fa9-8875-3a98735fe054",
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv2.jpg?alt=media&token=d7b245cf-2ba7-4ec6-a306-255ede668b86",
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv3.jpg?alt=media&token=a25debd7-161e-4331-9035-1ac9ecfd17d5",
            ],
        },
        4: {
            title: "Rus Piercing",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sed quidem molestias voluptates reprehenderit totam incidunt doloribus eius nemo maiores.",
            images: [
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv1.jpg?alt=media&token=295a6d04-96c5-4fa9-8875-3a98735fe054",
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv2.jpg?alt=media&token=d7b245cf-2ba7-4ec6-a306-255ede668b86",
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Fservices%2Fserv3.jpg?alt=media&token=a25debd7-161e-4331-9035-1ac9ecfd17d5",
            ],
        },
    }

    addDoc(ref, data)
}
