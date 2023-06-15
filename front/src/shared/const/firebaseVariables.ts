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
    testimonials: "testimonials",
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

export interface ITestimonialsData {
    title: string
    description: string
    artist: string
    duration: string
    preview: string
    video: string
}

export function addData(lang: keyof typeof LANGUAGE_DOCUMENT) {
    const ref = collection(
        db,
        DATA_COLLECTION,
        LANGUAGE_DOCUMENT[lang],
        SECTION_COLLECTION.testimonials
    )

    const data = {
        0: {
            title: "Rus Polynesian tribe tattoo",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, voluptas inventore voluptatibus fugit tenetur, numquam suscipit provident sequi nobis soluta ab laudantium esse dolor vitae est quae asperiores libero porro aut odit quia! Laborum, iure sint. Laboriosam error hic, natus quae esse dolor, voluptate sint explicabo quam, totam aspernatur cupiditate.",
            artist: "Vasia",
            duration: "14 hours",
            preview:
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Ftestimonials%2Ftestimonial1.jpg?alt=media&token=ec3edc16-be29-451b-8ed5-54d984100e0e",
            video: "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Ftestimonials%2Ftestimonial.mp4?alt=media&token=d7adff28-69a4-46bd-9115-4d029e2a8f3f",
        },
        1: {
            title: "Rus Polynesian tribe tattoo",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, voluptas inventore voluptatibus fugit tenetur, numquam suscipit provident sequi nobis soluta ab laudantium esse dolor vitae est quae asperiores libero porro aut odit quia! Laborum, iure sint. Laboriosam error hic, natus quae esse dolor, voluptate sint explicabo quam, totam aspernatur cupiditate.",
            artist: "Vasia",
            duration: "14 hours",
            preview:
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Ftestimonials%2Ftestimonial1.jpg?alt=media&token=ec3edc16-be29-451b-8ed5-54d984100e0e",
            video: "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Ftestimonials%2Ftestimonial.mp4?alt=media&token=d7adff28-69a4-46bd-9115-4d029e2a8f3f",
        },
        2: {
            title: "Rus Polynesian tribe tattoo",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, voluptas inventore voluptatibus fugit tenetur, numquam suscipit provident sequi nobis soluta ab laudantium esse dolor vitae est quae asperiores libero porro aut odit quia! Laborum, iure sint. Laboriosam error hic, natus quae esse dolor, voluptate sint explicabo quam, totam aspernatur cupiditate.",
            artist: "Vasia",
            duration: "14 hours",
            preview:
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Ftestimonials%2Ftestimonial1.jpg?alt=media&token=ec3edc16-be29-451b-8ed5-54d984100e0e",
            video: "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Ftestimonials%2Ftestimonial.mp4?alt=media&token=d7adff28-69a4-46bd-9115-4d029e2a8f3f",
        },
        3: {
            title: "Rus Polynesian tribe tattoo",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, voluptas inventore voluptatibus fugit tenetur, numquam suscipit provident sequi nobis soluta ab laudantium esse dolor vitae est quae asperiores libero porro aut odit quia! Laborum, iure sint. Laboriosam error hic, natus quae esse dolor, voluptate sint explicabo quam, totam aspernatur cupiditate.",
            artist: "Vasia",
            duration: "14 hours",
            preview:
                "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Ftestimonials%2Ftestimonial1.jpg?alt=media&token=ec3edc16-be29-451b-8ed5-54d984100e0e",
            video: "https://firebasestorage.googleapis.com/v0/b/leovink-tattoo.appspot.com/o/data%2Ftestimonials%2Ftestimonial.mp4?alt=media&token=d7adff28-69a4-46bd-9115-4d029e2a8f3f",
        },
    }

    addDoc(ref, data)
}
