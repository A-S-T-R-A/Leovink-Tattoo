import { ITranslatedArtistsData } from "../../types/types"
import { useState } from "react"
import {
    DATA_BUCKET,
    deleteImageFromBucket,
    reformatArrayToObject,
    updateSectionData,
} from "shared/const/firebaseVariables"
import { allLanguages, defaultLanguage } from "shared/const/languages"

export function DeleteParagraph({
    id,
    data,
    triggerRefetch,
}: {
    data: ITranslatedArtistsData | null
    id: number
    triggerRefetch?: () => void
}) {
    const [isLoading, setIsLoading] = useState(false)

    async function deleteClickHandler() {
        if (!data) return
        if (!confirm(`Delete id:${id}`)) return

        setIsLoading(true)

        deleteImageFromBucket(data[defaultLanguage][id].img, DATA_BUCKET.artists)

        const allArtistsData = { ...data }

        try {
            for (const lang of allLanguages) {
                delete allArtistsData[lang][id]
                const objectData = reformatArrayToObject(allArtistsData[lang])
                await updateSectionData(lang, "artists", objectData)
            }
            alert("Success")
        } catch (error) {
            alert("Error")
        }

        setIsLoading(false)
        triggerRefetch?.()
    }

    return <button onClick={deleteClickHandler}>Delete</button>
}
