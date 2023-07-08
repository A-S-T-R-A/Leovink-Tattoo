import { defaultLanguage } from "shared/const/languages"
import { IContactsGuide, IGlobalData } from "../../types/type"
import { useEffect, useState } from "react"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { LanguageType } from "shared/types/types"
import { MarkdownTextarea } from "shared/ui/MarkdownTextarea/MarkdownTextarea"
import { Alert } from "shared/ui/CustomNotifications"
import { isShallowEqual } from "shared/lib/isShallowEqual/isShallowEqual"
import { updateContactsGuideData } from "shared/const/firebaseVariables"
import { DecodeMarkdown } from "shared/ui/MarkdownTextarea/lib/DecodeMarkdown"

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
            <ModalEditorWithTranslation
                isOpen={isOpen}
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
            </ModalEditorWithTranslation>
            <div>
                <div>Location Guide:</div>
                <div>
                    {data ? <DecodeMarkdown data={data.contactsGuide[defaultLanguage]} /> : ""}
                </div>
                <button onClick={() => setIsOpen(true)}>Edit</button>
            </div>
        </>
    )
}
