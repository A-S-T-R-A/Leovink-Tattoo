import { INewAllData } from "../types/types"

export function isAllEntriesFilledUp(data: INewAllData) {
    for (const question of Object.values(data)) {
        for (const key in question) {
            if (key !== "img" && key !== "key") {
                if (question[key] === "") return false
            }
        }
    }
    return true
}
