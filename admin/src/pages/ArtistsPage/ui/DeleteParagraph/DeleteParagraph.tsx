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
import { ITranslatedOtherData } from "features/portfolioFilters/types/types"

export function DeleteParagraph({
    id,
    data,
    otherData,
    triggerRefetch,
}: {
    data: ITranslatedArtistsData | null
    id: number
    otherData: ITranslatedOtherData | null
    triggerRefetch?: () => void
}) {
    const [isLoading, setIsLoading] = useState(false)

    async function deleteClickHandler() {
        if (!data) return
        const isConfirmed = await Confirm(`Delete id:${id}`)
        if (!isConfirmed) return

        setIsLoading(true)

        deleteImageFromBucket(data[defaultLanguage][id].img, DATA_BUCKET.artists)

        const allArtistsData = JSON.parse(JSON.stringify(data))
        const updatedOtherData = otherData ? { ...otherData } : null
        const filterKeyToDelete = data[defaultLanguage][id].name

        try {
            for (const lang of allLanguages) {
                delete allArtistsData[lang][id]
                const objectData = reformatArrayToObject(allArtistsData[lang])
                await updateSectionData(lang, "artists", objectData)

                if (updatedOtherData) {
                    updatedOtherData[lang].filtersData.filters.artists = updatedOtherData[
                        lang
                    ].filtersData.filters.artists.filter(item => item.key !== filterKeyToDelete)

                    await updateSectionData(lang, "other", updatedOtherData[lang])
                }
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
