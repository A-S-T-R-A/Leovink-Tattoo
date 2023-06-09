import { ArtistType, ColorType, StyleType } from "shared/types/types"

export type ViewType = "table" | "icons"
export type TattooImageLiveType = "live" | "not_live"

export interface IFiltersData {
    artist: ArtistType[] | ""
    style: StyleType[] | ""
    color: ColorType[] | ""
    isLive: TattooImageLiveType | ""
}

export interface ITattooImageLive {
    value: TattooImageLiveType
    label: string
}
