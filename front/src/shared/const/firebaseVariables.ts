import type { LanguageType } from "shared/types/types"
import { db } from "../../../firebase"
import { addDoc, collection, getDocs } from "firebase/firestore"

const IS_DEV = import.meta.env.IS_DEV

const PORTFOLIO_PICTURES_DB = IS_DEV ? "dev_portfolio_pictures" : "portfolio_pictures"
const DATA_COLLECTION = IS_DEV ? "dev_data" : "data"

//const DATA_BUCKET = "data"

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

export function sortObjectData(obj: any): any {
    const sortedKeys = Object.keys(obj).sort((a, b) => Number(a) - Number(b))
    const sortedObject: any = {}

    for (const key of sortedKeys) {
        sortedObject[key] = { id: +key, ...obj[key] }
    }

    return sortedObject
}

export async function fetchImagesData() {
    const ref = collection(db, PORTFOLIO_PICTURES_DB)
    const docs = await getDocs(ref)
    if (docs.empty) return
    const currentData = docs.docs[0].data()
    const ascSortedData = sortObjectData(currentData)
    const dataArray = reformatObjectValuesToArray(ascSortedData)
    const liveData = dataArray.filter(item => item.isLive)
    return liveData
}

export const portfolioPicturesRef = collection(db, PORTFOLIO_PICTURES_DB)

export const TattooArtists = {
    Dinu: "Dinu",
    Katia: "Katia",
    Nastia: "Nastia",
} as const

export const TattooStyles = {
    First: "First",
    Second: "Second",
} as const

export const TattooColors = {
    Black: "Black",
    Color: "Color",
} as const

export type ArtistType = (typeof TattooArtists)[keyof typeof TattooArtists]
export type StyleType = (typeof TattooStyles)[keyof typeof TattooStyles]
export type ColorType = (typeof TattooColors)[keyof typeof TattooColors]

export interface IImagesData {
    alt: { en: ""; ro: ""; ru: "" }
    img: string
    artist: ArtistType
    style: StyleType
    color: ColorType
    isLive: boolean
}

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
    slug: string
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
    defaultLanguage: LanguageType
}

export interface IFilters {
    artist: ArtistType | ""
    style: StyleType | ""
    color: ColorType | ""
    isLive: boolean
}

export interface ITattooImage extends IFilters {
    img: string
    alt: string
}

/* export function addData() {
    const ref = collection(db, PORTFOLIO_PICTURES_DB)

    const data = {
        0: {
            img: "",
            alt: "",
            artist: "",
            style: "",
            color: "",
            isLive: false,
        },
    }

    addDoc(ref, data)
} */
