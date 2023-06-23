export interface IServiceData {
    title: string
    images: string[]
    description: string
}

export interface ITranslatedServiceData {
    en: IServiceData[]
    ro: IServiceData[]
    ru: IServiceData[]
}

export interface IPreviewImage {
    blob: any
    url: string
}

export interface INewAllData {
    en: IServiceData
    ro: IServiceData
    ru: IServiceData
}
