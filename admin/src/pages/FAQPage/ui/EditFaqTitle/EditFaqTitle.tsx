import { useEffect, useState } from "react"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"
import { LanguageType } from "shared/types/types"
import styles from "./EditFaqTitle.module.scss"
import { ITranslatedFaqData } from "../../types/types"
import { Input } from "shared/ui/Input/Input"
import { defaultLanguage } from "shared/const/languages"
import { reformatArrayToObject, updateSectionData } from "shared/const/firebaseVariables"
import { Alert } from "shared/ui/CustomNotifications"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"

export function EditFaqTitle({
    data,
    id,
    triggerRefetch,
}: {
    data: ITranslatedFaqData | null
    id: number
    triggerRefetch: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)
    const [newTitle, setNewTitle] = useState("")

    useEffect(() => {
        refreshNewData()
    }, [data, currentLanguage, id])

    function refreshNewData() {
        if (data) {
            setNewTitle(data[currentLanguage][id].title)
        }
    }

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        refreshNewData()
    }

    async function saveClickHandler() {
        if (!data) return
        if (data?.[currentLanguage][id].title === newTitle) {
            Alert.info("Nothing to save")
            return
        }

        setIsLoading(true)

        try {
            const documentData = [...data[currentLanguage]]
            documentData[id].title = newTitle
            const objectData = reformatArrayToObject(documentData)
            await updateSectionData(currentLanguage, "faq", objectData)

            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsLoading(false)
        setIsOpen(false)
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
                    <div>id: {id}</div>
                    <Input label="Title" value={newTitle} onChange={value => setNewTitle(value)} />
                </div>
            </ModalEditor>
            <button onClick={() => setIsOpen(true)} className={styles.btn}>
                Edit
            </button>
        </>
    )
}
