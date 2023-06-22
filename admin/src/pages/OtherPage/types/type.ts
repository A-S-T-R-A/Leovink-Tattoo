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
