export interface IArtistData {
    name: string
    description: string
    specialization: string
    img: string
    slug: string
    key: string
}

export interface ITranslatedArtistsData {
    en: IArtistData[]
    ro: IArtistData[]
    ru: IArtistData[]
}

export interface IPreviewImage {
    blob: any
    url: string
}

export interface INewAllData {
    en: IArtistData
    ro: IArtistData
    ru: IArtistData
}
