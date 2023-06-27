import { ITattooImageLive } from "../types/types"

export const defaultNewData = {
    id: -1,
    img: "",
    alt: { en: "", ro: "", ru: "" },
    filters: {
        isLive: false,
    },
}

export const tattooLiveDropdownOptions: ITattooImageLive[] = [
    { label: "Published", value: "live" },
    { label: "Unpublished", value: "not_live" },
]
