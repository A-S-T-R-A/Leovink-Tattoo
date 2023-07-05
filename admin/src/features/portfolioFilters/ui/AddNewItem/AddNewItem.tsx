import { defaultNewFilter } from "../../const/const"
import { IOtherData } from "../../types/types"
import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { updateSectionData } from "shared/const/firebaseVariables"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { LanguageType } from "shared/types/types"
import { Alert } from "shared/ui/CustomNotifications"
import { Input } from "shared/ui/Input/Input"
import styles from "./AddNewItem.module.scss"

export function AddNewItem({
    data,
    parentKey,
    triggerRefetch,
}: {
    data: ITranslatedOtherData | null
    parentKey: { en: string; ro: string; ru: string }
    triggerRefetch: () => void
}) {
    const [newAllItem, setNewAllItem] = useState(defaultNewFilter)
    const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        setNewAllItem(defaultNewFilter)
    }

    async function saveClickHandler() {
        if (!data) return
        if (Object.values(newAllItem).some(item => item === "")) {
            Alert.info("You have to fill up all languages")
            return
        }

        setIsLoading(true)

        /*  try {
            for (const lang of allLanguages) {
                const newData = JSON.parse(JSON.stringify(data)) 
                newData.filtersData.filters[newFilter[lang]] = []

                await updateSectionData(lang, "other", newData)
            }
            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        } */

        setIsOpen(false)
        setIsLoading(false)
        setNewAllItem(defaultNewFilter)
        triggerRefetch()
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
                    value={newAllItem[currentLanguage]}
                    onChange={value =>
                        setNewAllItem(prev => ({ ...prev, [currentLanguage]: value }))
                    }
                />
            </ModalEditorWithTranslation>
            <button className={styles.btn} onClick={() => setIsOpen(true)}>
                Add New Item
            </button>
        </>
    )
}
