import { LanguageType } from "shared/types/types"
import { INewAllData } from "../types/types"

export function isAllLanguagesFilledUp(data: INewAllData) {
    for (const l in data) {
        const lang = l as LanguageType
        const { video, preview, ...rest } = data[lang]

        if (Object.values(rest).some(item => item === "")) return false
    }
    return true
}
