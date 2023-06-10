export type TattooImageLiveType = "live" | "not_live"
export interface ITattooImageLive {
    value: TattooImageLiveType
    label: string
}

export const tattooLiveDropdownOptions: ITattooImageLive[] = [
    { label: "Published", value: "live" },
    { label: "Unpublished", value: "not_live" },
]
