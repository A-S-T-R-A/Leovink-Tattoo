import { TattooArtists, TattooColors, TattooStyles } from "../const/filters"

export type ArtistType = (typeof TattooArtists)[keyof typeof TattooArtists]
export type StyleType = (typeof TattooStyles)[keyof typeof TattooStyles]
export type ColorType = (typeof TattooColors)[keyof typeof TattooColors]

export interface IFilters {
    [key: string]: string
}

export interface ITattooImage {
    id: number
    img: string
    isLive?: boolean
    [key: string]: unknown
    alt: { en: string; ro: string; ru: string }
}

interface IFaqQuestion {
    id: number
    question: string
    answer: string
}

export interface IFaqBlock {
    id: number
    title: string
    questions: IFaqQuestion[]
}

export type LanguageType = "ro" | "en" | "ru"
