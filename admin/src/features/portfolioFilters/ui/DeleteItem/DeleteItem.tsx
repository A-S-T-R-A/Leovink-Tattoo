import { useState } from "react"
import styles from "./DeleteItem.module.scss"
import { IFiltersData, IGlobalData } from "../../types/types"
import { Alert, Confirm } from "shared/ui/CustomNotifications"
import { updateFiltersData } from "shared/const/firebaseVariables"
import { fetchAllImages } from "features/portfolioFilters/lib/fetchTattooImages"
import { uploadTattooImages } from "features/portfolioFilters/lib/uploadTattooImages"

export function DeleteItem({
    data,
    triggerRefetch,
    parentId,
    filterKey,
    parentTitle,
}: {
    data: IGlobalData | null
    triggerRefetch: () => void
    parentId: number
    filterKey: string
    parentTitle: string
}) {
    const [isLoading, setIsLoading] = useState(false)

    async function deleteFilterItemFromImages() {
        const images = await fetchAllImages()
        const newImages = images.map(item => {
            if (item.filters[parentTitle] === filterKey) {
                const newItem = JSON.parse(JSON.stringify(item))
                newItem.filters[parentTitle] = ""
                return newItem
            }
            return item
        })
        await uploadTattooImages(newImages)
    }

    async function deleteClickHandler() {
        if (!data) return
        const isConfirmed = await Confirm(`Delete item:${filterKey}`)
        if (!isConfirmed) return

        setIsLoading(true)

        try {
            const newFiltersData = JSON.parse(JSON.stringify(data.filtersData)) as IFiltersData
            const dataToUpload = newFiltersData.filters.map(item => {
                if (item.id === parentId) {
                    return {
                        ...item,
                        items: item.items.filter(innerItem => innerItem.key !== filterKey),
                    }
                }

                return item
            })
            newFiltersData.filters = dataToUpload
            await updateFiltersData(newFiltersData)
            await deleteFilterItemFromImages()

            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsLoading(false)
        triggerRefetch?.()
    }

    return (
        <button className={styles.btn} onClick={deleteClickHandler}>
            Delete Item
        </button>
    )
}
