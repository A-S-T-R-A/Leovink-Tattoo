import { IFiltersData } from "features/portfolioFilters"
import { LanguageType } from "shared/types/types"

/* export interface IOtherData {
    sectionNames: {
        portfolio: string
        steps: string
        services: string
        artists: string
        testimonials: string
        faq: string
        form: string
    }
    buttons: {
        cta: string
        showMore: string
        viewGallery: string
        resetFilters: string
    }
    filters: {
        artist: string[]
        style: string[]
        color: string[]
    }

    defaultLanguage: LanguageType
} */

export interface ISocialMedia {
    id: number
    icon: string
    link: string
}

export interface IAddressData {
    location: { en: string; ro: string; ru: string }
    phone: string[]
    mail: string[]
}

export interface IGlobalData {
    filtersData: IFiltersData
    socialsData: ISocialMedia[]
    addressData: IAddressData
}

export interface IPreviewImage {
    blob: string
    url: string
}
