import { ITranslatedTestimonialsData } from "../../types/types"
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
    data: ITranslatedTestimonialsData | null
    id: number
    triggerRefetch?: () => void
}) {
    const [isLoading, setIsLoading] = useState(false)

    async function deleteClickHandler() {
        if (!data) return
        if (!confirm(`Delete id:${id}`)) return

        setIsLoading(true)

        deleteImageFromBucket(data[defaultLanguage][id].preview, DATA_BUCKET.testimonials)
        deleteImageFromBucket(data[defaultLanguage][id].video, DATA_BUCKET.testimonials)

        const allReviewsData = { ...data }

        try {
            for (const lang of allLanguages) {
                delete allReviewsData[lang][id]
                const objectData = reformatArrayToObject(allReviewsData[lang])
                await updateSectionData(lang, "testimonials", objectData)
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
