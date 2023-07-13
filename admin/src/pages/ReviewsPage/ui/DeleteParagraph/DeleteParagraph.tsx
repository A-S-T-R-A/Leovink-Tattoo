import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { ITranslatedTestimonialsData } from "../../types/types"
import { useState } from "react"
import {
    DATA_BUCKET,
    deleteImageFromBucket,
    reformatArrayToObject,
    updateSectionData,
} from "shared/const/firebaseVariables"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { Alert, Confirm } from "shared/ui/CustomNotifications"
import styles from "./DeleteParagraph.module.scss"

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
        const isConfirmed = await Confirm(`Delete id:${id}`)
        if (!isConfirmed) return

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
            <button onClick={deleteClickHandler} className={styles.btn}>
                Delete
            </button>
        </>
    )
}
