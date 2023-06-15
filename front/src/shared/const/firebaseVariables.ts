import { db } from "../../../firebase"
import { addDoc, collection, getDocs } from "firebase/firestore"

const PORTFOLIO_PICTURES_DB = "portfolio_pictures"
const DATA_COLLECTION = "data"

const LANGUAGE_DOCUMENT = {
    en: "english",
    ro: "romanian",
    ru: "russian",
}

export const SECTION_COLLECTION = {
    steps: "steps",
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

export function addData() {
    const ref = collection(db, DATA_COLLECTION, LANGUAGE_DOCUMENT.ru, SECTION_COLLECTION.steps)

    const data = {
        0: {
            title: "Rus Consultation",
            img: "",
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt totam, obcaecati praesentium veniam.`,
        },
        1: {
            title: "Rus Preparation",
            img: "",
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt totam, obcaecati praesentium veniam.`,
        },
        2: {
            title: "Rus Drawing a Picture",
            img: "",
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt totam, obcaecati praesentium veniam.`,
        },
    }

    addDoc(ref, data)
}
