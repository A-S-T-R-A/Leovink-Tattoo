export interface IFilterItem {
    key: string
    label: {
        en: string
        ro: string
        ru: string
    }
}

export interface IFilter {
    id: number
    title: { en: string; ro: string; ru: string }
    items: IFilterItem[]
}

export interface IFiltersData {
    filters: IFilter[]
    reset: { en: string; ro: string; ru: string }
}

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
        loading: string
        success: string
        error: string
    }
    ro: {
        name: string
        phone: string
        loading: string
        success: string
        error: string
    }
    ru: {
        name: string
        phone: string
        loading: string
        success: string
        error: string
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

export interface IFooterList {
    en: {
        [key: number]: string
    }
    ro: {
        [key: number]: string
    }
    ru: {
        [key: number]: string
    }
}

export interface INavList {
    en: {
        [key: number]: { link: string; text: string }
    }
    ro: {
        [key: number]: { link: string; text: string }
    }
    ru: {
        [key: number]: { link: string; text: string }
    }
}

export interface ILayoutData {
    footerList: IFooterList
    navList: INavList
}

export interface IGlobalData {
    filtersData: IFiltersData
    socialsData: ISocialMedia[]
    addressData: IAddressData
    contactsGuide: IContactsGuide
    formData: IFormData
    sectionNames: ISectionNames
    buttons: IButtonsData
    layoutData: ILayoutData
}

export interface IPreviewImage {
    blob: string
    url: string
}
