export type ViewType = "table" | "icons"
export type TattooImageLiveType = "live" | "not_live"

export interface ITattooImageLive {
    value: TattooImageLiveType
    label: string
}

export interface IChosenFilter {
    [key: string]: string | boolean
    isLive: boolean
}

export interface ITattooImage {
    id: number
    img: string
    alt: {
        en: string
        ro: string
        ru: string
    }
    filters: IChosenFilter
}

export type UploadTattooImageType = { [key: number]: Omit<ITattooImage, "id"> }

export interface ITattooImageLive {
    value: TattooImageLiveType
    label: string
}
