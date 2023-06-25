import { INewAllData } from "../types/types"

export function isAllEntriesFilledUp(data: INewAllData) {
    for (const question of Object.values(data)) {
        console.log(question)
        for (const key in question) {
            if (key !== "img" && question[key] === "") return false
        }
    }
    return true
}
