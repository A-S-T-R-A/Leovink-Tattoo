import { allLanguages } from "shared/const/languages"
import { ITranslatedFaqData } from "../../types/types"
import { useState } from "react"
import { reformatArrayToObject, updateSectionData } from "shared/const/firebaseVariables"

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
        if (!confirm(`Delete question id:${id}?`)) return

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
            alert("Success")
        } catch (error) {
            alert(error)
        }

        setIsLoading(false)
        triggerRefetch?.()
    }
    return <button onClick={deleteClickHandler}>Delete</button>
}
