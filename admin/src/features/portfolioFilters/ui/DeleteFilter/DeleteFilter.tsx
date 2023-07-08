import { updateFiltersData } from "shared/const/firebaseVariables"
import { IFiltersData } from "../../types/types"
import styles from "./DeleteFilter.module.scss"
import { useState } from "react"
import { Alert, Confirm } from "shared/ui/CustomNotifications"
import { fetchAllImages } from "../../lib/fetchTattooImages"
import { uploadTattooImages } from "features/portfolioFilters/lib/uploadTattooImages"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { IGlobalData } from "pages/OtherPage"

export function DeleteFilter({
    data,
    triggerRefetch,
    id,
    title,
}: {
    data: IGlobalData | null
    triggerRefetch: () => void
    id: number
    title: string
}) {
    const [isLoading, setIsLoading] = useState(false)

    async function deleteFilterFromImages() {
        const images = await fetchAllImages()
        const newImages = images.map(item => {
            if (item.filters[title]) {
                const newItem = JSON.parse(JSON.stringify(item))
                delete newItem.filters[title]
                return newItem
            }
            return item
        })
        await uploadTattooImages(newImages)
    }

    async function deleteClickHandler() {
        if (!data) return
        const isConfirmed = await Confirm(`Delete id:${id}`)
        if (!isConfirmed) return

        setIsLoading(true)

        try {
            const newFiltersData = JSON.parse(JSON.stringify(data.filtersData)) as IFiltersData
            const dataToUpload = newFiltersData.filters.filter(item => item.id !== id)
            newFiltersData.filters = dataToUpload
            await updateFiltersData(newFiltersData)
            await deleteFilterFromImages()

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
            <button className={styles.btn} onClick={deleteClickHandler}>
                Delete Filter
            </button>
        </>
    )
}
