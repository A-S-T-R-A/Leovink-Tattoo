export type ViewType = "table" | "icons"
export type TattooImageLiveType = "live" | "not_live"

export interface ITattooImageLive {
    value: TattooImageLiveType
    label: string
}

export interface ITattooImage {
    id: number
    img: string
    alt: {
        en: string
        ro: string
        ru: string
    }
    filters: { [key: string]: any; isLive: boolean }
}

export type UploadTattooImageType = { [key: number]: Omit<ITattooImage, "id"> }

export interface ITattooImageLive {
    value: TattooImageLiveType
    label: string
}
