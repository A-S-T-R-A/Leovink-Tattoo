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
    layout: "layout",
}

function reformatObjectValuesToArray(obj: any): any[] {
    return Object.values(obj) as any[]
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
    const reformattedNewData = reformatObjectValuesToArray(newData)
    return !!raw ? newData : reformattedNewData
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

export type NavlistType = { link: string; text: string }[]
export type FooterType = { location: string; contacts: string[] }

export interface ILayoutData {
    navlist: NavlistType
    footer: FooterType
}

export function addData(lang: keyof typeof LANGUAGE_DOCUMENT) {
    const ref = collection(db, DATA_COLLECTION, LANGUAGE_DOCUMENT[lang], SECTION_COLLECTION.layout)

    const data = {
        navlist: [
            { link: "/", text: "Главная" },
            { link: "/portfolio", text: "Портфолио" },
            { link: "/faq", text: "Вопросы" },
            { link: "/contact", text: "Контакты" },
            { link: "/testimonials", text: "Отзывы" },
        ],
        footer: {
            location: "улица Измаил 40/2, Кишинев",
            contacts: ["069 222 222", "069 222 222", "email@gg.ss"],
        },
    }

    addDoc(ref, data)
}
