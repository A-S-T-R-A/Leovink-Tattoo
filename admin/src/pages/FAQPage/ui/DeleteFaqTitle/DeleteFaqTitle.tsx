import { allLanguages } from "shared/const/languages"
import { ITranslatedFaqData } from "../../types/types"
import { useState } from "react"
import { reformatArrayToObject, updateSectionData } from "shared/const/firebaseVariables"
import { Alert, Confirm } from "shared/ui/CustomNotifications"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import styles from "./DeleteFaqTitle.module.scss"

export function DeleteFaqTitle({
    id,
    data,
    triggerRefetch,
}: {
    data: ITranslatedFaqData | null
    id: number
    triggerRefetch?: () => void
}) {
    const [isLoading, setIsLoading] = useState(false)

    async function deleteClickHandler() {
        if (!data) return
        const isConfirmed = await Confirm(`Delete title id:${id} and all its questions?`)
        if (!isConfirmed) return

        setIsLoading(true)

        const allFaqData = { ...data }

        try {
            for (const lang of allLanguages) {
                delete allFaqData[lang][id]
                const objectData = reformatArrayToObject(allFaqData[lang])
                await updateSectionData(lang, "faq", objectData)
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
