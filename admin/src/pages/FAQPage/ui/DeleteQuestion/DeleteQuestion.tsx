import { allLanguages } from "shared/const/languages"
import { ITranslatedFaqData } from "../../types/types"
import { useState } from "react"
import { reformatArrayToObject, updateSectionData } from "shared/const/firebaseVariables"
import { Alert, Confirm } from "shared/ui/CustomNotifications"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"

export function DeleteQuestion({
    id,
    data,
    titleId,
    triggerRefetch,
}: {
    data: ITranslatedFaqData | null
    titleId: number
    id: number
    triggerRefetch?: () => void
}) {
    const [isLoading, setIsLoading] = useState(false)

    async function deleteClickHandler() {
        if (!data) return
        const isConfirmed = await Confirm(`Delete question id:${id}?`)
        if (!isConfirmed) return

        setIsLoading(true)

        const allFaqData = { ...data }

        try {
            for (const lang of allLanguages) {
                allFaqData[lang][titleId].questions = allFaqData[lang][titleId].questions.filter(
                    (_, index) => index !== id
                )
                const objectData = reformatArrayToObject(allFaqData[lang])
                await updateSectionData(lang, "faq", objectData)
            }
            Alert.success("Success")
        } catch (error) {
            Alert.error("error")
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
