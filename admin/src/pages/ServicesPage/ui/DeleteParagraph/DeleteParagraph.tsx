import { ITranslatedServiceData } from "pages/ServicesPage/types/types"
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
    data: ITranslatedServiceData | null
    id: number
    triggerRefetch?: () => void
}) {
    const [isLoading, setIsLoading] = useState(false)

    async function deleteClickHandler() {
        if (!data) return
        if (!confirm(`Delete id:${id}`)) return

        setIsLoading(true)

        const images = data[defaultLanguage][id].images
        for (const img of images) {
            deleteImageFromBucket(img, DATA_BUCKET.services)
        }

        const allStepsData = { ...data }

        for (const lang of allLanguages) {
            delete allStepsData[lang][id]
            const objectData = reformatArrayToObject(allStepsData[lang])
            await updateSectionData(lang, "services", objectData)
        }

        try {
            alert("Success")
        } catch (error) {
            alert("Error")
        }

        setIsLoading(false)
        triggerRefetch?.()
    }

    return <button onClick={deleteClickHandler}>Delete</button>
}
