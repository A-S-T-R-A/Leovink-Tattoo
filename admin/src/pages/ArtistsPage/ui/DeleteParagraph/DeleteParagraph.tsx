import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { ITranslatedArtistsData } from "../../types/types"
import { useState } from "react"
import {
    DATA_BUCKET,
    deleteImageFromBucket,
    reformatArrayToObject,
    updateFiltersData,
    updateSectionData,
} from "shared/const/firebaseVariables"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { Alert, Confirm } from "shared/ui/CustomNotifications"
import { IFiltersData } from "features/portfolioFilters/types/types"

export function DeleteParagraph({
    name,
    id,
    data,
    filtersData,
    triggerRefetch,
}: {
    name: string
    data: ITranslatedArtistsData | null
    id: number
    filtersData: IFiltersData | null
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

        try {
            for (const lang of allLanguages) {
                delete allArtistsData[lang][id]
                const objectData = reformatArrayToObject(allArtistsData[lang])
                await updateSectionData(lang, "artists", objectData)
            }

            if (filtersData) {
                const updatedFiltersData = JSON.parse(JSON.stringify(filtersData)) as IFiltersData

                const filterItems = filtersData.filters[0].items.filter(item => item.key !== name)
                updatedFiltersData.filters[0].items = filterItems
                await updateFiltersData(updatedFiltersData)
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
