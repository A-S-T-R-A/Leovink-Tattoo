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
    other: "other",
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
    const data = !!raw ? newData : reformattedNewData
    return data
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
export type FooterType = { location: string; footerList: string[]; contacts: string[] }

export interface ILayoutData {
    navlist: NavlistType
    footer: FooterType
}

export interface IOtherData {
    sectionNames: {
        portfolio: string
        steps: string
        services: string
        artists: string
        testimonials: string
        faq: string
        form: string
    }
    filtersData: {
        artists: string
        styles: string
        colors: string
        reset: string
    }
    formData: {
        name: string
        phone: string
    }
    buttons: {
        cta: string
        showMore: string
        viewGallery: string
    }
}

export function addData(lang: keyof typeof LANGUAGE_DOCUMENT) {
    const ref = collection(db, DATA_COLLECTION, LANGUAGE_DOCUMENT[lang], SECTION_COLLECTION.other)

    const data = {
        sectionNames: {
            portfolio: "Портфолио",
            steps: "Как это работает",
            services: "Услуги",
            artists: "Тату мастера",
            testimonials: "Отзывы",
            faq: "Частые Вопросы",
            form: "Оставить заявку",
        },
        formData: {
            name: "Имя",
            phone: "Телефон",
        },
    }

    addDoc(ref, data)
}
