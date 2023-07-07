import { IFiltersData } from "features/portfolioFilters"

export interface ISocialMedia {
    id: number
    icon: string
    link: string
}

export type AddressType = "location" | "phone" | "mail"

export interface IAddressData {
    location: { en: string; ro: string; ru: string }
    phone: string[]
    mail: string[]
}

export interface IContactsGuide {
    en: string
    ro: string
    ru: string
}

export interface IFormData {
    en: {
        name: string
        phone: string
    }
    ro: {
        name: string
        phone: string
    }
    ru: {
        name: string
        phone: string
    }
}

export interface ISectionNames {
    en: {
        portfolio: string
        steps: string
        services: string
        artists: string
        testimonials: string
        faq: string
        form: string
    }
    ro: {
        portfolio: string
        steps: string
        services: string
        artists: string
        testimonials: string
        faq: string
        form: string
    }
    ru: {
        portfolio: string
        steps: string
        services: string
        artists: string
        testimonials: string
        faq: string
        form: string
    }
}

export interface IButtonsData {
    en: {
        cta: string
        showMore: string
        viewGallery: string
        resetFilters: string
    }
    ro: {
        cta: string
        showMore: string
        viewGallery: string
        resetFilters: string
    }
    ru: {
        cta: string
        showMore: string
        viewGallery: string
        resetFilters: string
    }
}

export interface IGlobalData {
    filtersData: IFiltersData
    socialsData: ISocialMedia[]
    addressData: IAddressData
    contactsGuide: IContactsGuide
    formData: IFormData
    sectionNames: ISectionNames
    buttons: IButtonsData
}

export interface IPreviewImage {
    blob: string
    url: string
}
