import { defaultLanguage } from "shared/const/languages"
import { IGlobalData } from "../../types/type"
import { useEffect, useState } from "react"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { LanguageType } from "shared/types/types"
import { MarkdownTextarea } from "shared/ui/MarkdownTextarea/MarkdownTextarea"
import { Alert } from "shared/ui/CustomNotifications"
import { isShallowEqual } from "shared/lib/isShallowEqual/isShallowEqual"
import { updateContactsGuideData } from "shared/const/firebaseVariables"
import { DecodeMarkdown } from "shared/ui/MarkdownTextarea/lib/DecodeMarkdown"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"
import styles from "./ContactsGuide.module.scss"

export function ContactsGuide({
    data,
    triggerRefetch,
}: {
    data: IGlobalData | null
    triggerRefetch: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
    const [newAllData, setNewAllData] = useState({ en: "", ro: "", ru: "" })

    useEffect(() => {
        refreshNewData()
    }, [data])

    function refreshNewData() {
        if (data) {
            setNewAllData(data.contactsGuide)
        }
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
        if (isShallowEqual(newAllData, data.contactsGuide)) {
            Alert.info("Nothing to save")
            return
        }

        setIsLoading(true)

        try {
            await updateContactsGuideData(newAllData)
            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsOpen(false)
        setIsLoading(false)
        triggerRefetch()
    }

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <ModalEditor
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                <MarkdownTextarea
                    onSaveData={value =>
                        setNewAllData(prev => ({ ...prev, [currentLanguage]: value }))
                    }
                    initialData={newAllData[currentLanguage]}
                />
            </ModalEditor>
            <div className={styles.guideContainer}>
                <div className={styles.guide}>
                    <strong>Location Guide:</strong>
                    {data ? <DecodeMarkdown data={data.contactsGuide[defaultLanguage]} /> : ""}
                </div>
                <button className={styles.editBtn} onClick={() => setIsOpen(true)}>
                    Edit
                </button>
            </div>
        </>
    )
}
