import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { ITranslatedArtistsData } from "../../types/types"
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
    data: ITranslatedArtistsData | null
    id: number
    triggerRefetch?: () => void
}) {
    const [isLoading, setIsLoading] = useState(false)

    async function deleteClickHandler() {
        if (!data) return
        const isConfirmed = await Confirm(`Delete id:${id}`)
        if (!isConfirmed) return

        setIsLoading(true)

        deleteImageFromBucket(data[defaultLanguage][id].img, DATA_BUCKET.artists)

        const allArtistsData = { ...data }

        try {
            for (const lang of allLanguages) {
                delete allArtistsData[lang][id]
                const objectData = reformatArrayToObject(allArtistsData[lang])
                await updateSectionData(lang, "artists", objectData)
            }
            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsLoading(false)
        triggerRefetch?.()
    }

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <button onClick={deleteClickHandler}>Delete</button>
        </>
    )
}
