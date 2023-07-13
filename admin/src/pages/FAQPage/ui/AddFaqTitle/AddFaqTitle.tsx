import { useState } from "react"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"
import { Input } from "shared/ui/Input/Input"
import styles from "./AddFaqTitle.module.scss"
import { LanguageType } from "shared/types/types"
import { INewAllTitlesData, ITranslatedFaqData } from "../../types/types"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { defaultNewAllTitlesData } from "pages/FAQPage/const/const"
import { reformatArrayToObject, updateSectionData } from "shared/const/firebaseVariables"
import { Alert } from "shared/ui/CustomNotifications"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"

export function AddFaqTitle({
    data,
    triggerRefetch,
}: {
    data: ITranslatedFaqData | null
    triggerRefetch?: () => void
}) {
    const [newAllTitlesData, setNewAllTitlesData] =
        useState<INewAllTitlesData>(defaultNewAllTitlesData)
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)
    const [isLoading, setIsLoading] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        setNewAllTitlesData(defaultNewAllTitlesData)
    }

    async function saveClickHandler() {
        if (!data) return
        if (Object.values(newAllTitlesData).some(item => item === "")) {
            Alert.info("You have to fill up all languages")
            return
        }

        setIsLoading(true)

        try {
            const allFaqData = { ...data }
            const id = allFaqData[defaultLanguage].length
            for (const lang of allLanguages) {
                allFaqData[lang][id] = { title: newAllTitlesData[lang], questions: [] }
                const objectData = reformatArrayToObject(allFaqData[lang])
                await updateSectionData(lang, "faq", objectData)
            }

            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsOpen(false)
        setIsLoading(false)
        setNewAllTitlesData(defaultNewAllTitlesData)
        triggerRefetch?.()
    }

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <ModalEditor
                withTranslation
                isOpen={isOpen}
                onClose={onClose}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                <div className={styles.container}>
                    <Input
                        label="Title"
                        value={newAllTitlesData[currentLanguage]}
                        onChange={value =>
                            setNewAllTitlesData(prev => ({ ...prev, [currentLanguage]: value }))
                        }
                    />
                </div>
            </ModalEditor>
            <button onClick={() => setIsOpen(true)} className={styles.btn}>
                Add new title
            </button>
        </>
    )
}
