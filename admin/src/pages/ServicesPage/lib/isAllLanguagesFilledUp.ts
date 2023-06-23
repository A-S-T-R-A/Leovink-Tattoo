import { LanguageType } from "shared/types/types"
import { INewAllData } from "../types/types"

export function isAllLanguagesFilledUp(data: INewAllData) {
    for (const l in data) {
        const lang = l as LanguageType
        const { title, description } = data[lang]
        if (title === "" || description === "") {
            return false
        }
    }
    return true
}
