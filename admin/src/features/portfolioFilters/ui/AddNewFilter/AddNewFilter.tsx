import { useState } from "react"
import { IFilters, INewFilter, IOtherData } from "../../types/types"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { LanguageType } from "shared/types/types"
import { Alert } from "shared/ui/CustomNotifications"
import { defaultNewFilter } from "../../const/const"
import { updateSectionData } from "shared/const/firebaseVariables"

export function AddNewFilter({
    data,
    triggerRefetch,
}: {
    data: IOtherData | null
    triggerRefetch: () => void
}) {
    const [newFilter, setNewFilter] = useState<INewFilter>(defaultNewFilter)
    const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    async function saveClickHandler() {
        if (!data) return
        if (Object.values(newFilter).some(item => item === "")) {
            Alert.info("You have to fill up all languages")
            return
        }
        setIsLoading(true)

        const newData = { ...data }

        try {
            for (const lang of allLanguages) {
                newData.filtersData.filters[newFilter[lang]] = []

                await updateSectionData(lang, "other", newData)
            }
            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsOpen(false)
        setIsLoading(false)
        setNewFilter(defaultNewFilter)
        triggerRefetch()
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        setNewFilter(defaultNewFilter)
    }

    return (
        <>
            <ModalEditorWithTranslation
                isOpen={isOpen}
                onClose={() => setIsOpen(true)}
                currentLanguage={currentLanguage}
                onChangeLanguage={onChangeLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                <Input
                    value={newFilter[currentLanguage]}
                    onChange={value =>
                        setNewFilter(prev => ({ ...prev, [currentLanguage]: value }))
                    }
                />
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Add New Filter</button>
        </>
    )
}
