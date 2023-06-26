import { ITranslatedServiceData } from "pages/ServicesPage/types/types"
import { useState } from "react"
import {
    DATA_BUCKET,
    deleteImageFromBucket,
    reformatArrayToObject,
    updateSectionData,
} from "shared/const/firebaseVariables"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { Alert, Confirm } from "shared/ui/CustomNotifications"

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
        if (!Confirm(`Delete id:${id}`)) return

        setIsLoading(true)

        const images = data[defaultLanguage][id].images
        for (const img of images) {
            deleteImageFromBucket(img, DATA_BUCKET.services)
        }

        const allStepsData = { ...data }

        try {
            for (const lang of allLanguages) {
                delete allStepsData[lang][id]
                const objectData = reformatArrayToObject(allStepsData[lang])
                await updateSectionData(lang, "services", objectData)
            }
            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsLoading(false)
        triggerRefetch?.()
    }

    return <button onClick={deleteClickHandler}>Delete</button>
}
