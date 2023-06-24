import { LanguageType } from "shared/types/types"

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
}
