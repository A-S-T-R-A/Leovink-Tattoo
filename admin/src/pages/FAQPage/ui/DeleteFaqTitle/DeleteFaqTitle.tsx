import { allLanguages } from "shared/const/languages"
import { ITranslatedFaqData } from "../../types/types"
import { useState } from "react"
import { reformatArrayToObject, updateSectionData } from "shared/const/firebaseVariables"

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
        if (!confirm(`Delete title id:${id} and all its questions?`)) return

        setIsLoading(true)

        const allFaqData = { ...data }

        try {
            for (const lang of allLanguages) {
                delete allFaqData[lang][id]
                const objectData = reformatArrayToObject(allFaqData[lang])
                await updateSectionData(lang, "faq", objectData)
            }
            alert("Success")
        } catch (error) {
            alert("Error")
        }

        setIsLoading(false)
        triggerRefetch?.()
    }
    return <button onClick={deleteClickHandler}>Delete</button>
}
