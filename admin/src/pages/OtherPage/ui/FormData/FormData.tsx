import { defaultLanguage } from "shared/const/languages"
import { IGlobalData } from "../../types/type"
import { useEffect, useState } from "react"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { LanguageType } from "shared/types/types"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { isDeepEqual } from "shared/lib/isDeepEqual/isDeepEqual"
import { Alert } from "shared/ui/CustomNotifications"
import { updateFormData } from "shared/const/firebaseVariables"

const defaultNewAllData = {
    en: { name: "", phone: "" },
    ro: { name: "", phone: "" },
    ru: { name: "", phone: "" },
}

export function FormData({
    data,
    triggerRefetch,
}: {
    data: IGlobalData | null
    triggerRefetch: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
    const [newAllData, setNewAllData] = useState(defaultNewAllData)

    useEffect(() => {
        refreshNewData()
    }, [data])

    function refreshNewData() {
        if (data) {
            setNewAllData(data.formData)
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
        if (isDeepEqual(newAllData, data.formData)) {
            Alert.info("Nothing to save")
            return
        }

        setIsLoading(true)

        try {
            await updateFormData(newAllData)
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
                <Input
                    label="Name placeholder"
                    value={newAllData[currentLanguage].name}
                    onChange={name =>
                        setNewAllData(prev => ({
                            ...prev,
                            [currentLanguage]: { ...prev[currentLanguage], name },
                        }))
                    }
                />
                <Input
                    label="Phone placeholder"
                    value={newAllData[currentLanguage].phone}
                    onChange={phone =>
                        setNewAllData(prev => ({
                            ...prev,
                            [currentLanguage]: { ...prev[currentLanguage], phone },
                        }))
                    }
                />
            </ModalEditorWithTranslation>
            <div>
                <div>Name placeholder: {data && data?.formData[defaultLanguage].name}</div>
                <div>Phone placeholder: {data && data?.formData[defaultLanguage].phone}</div>
                <button onClick={() => setIsOpen(true)}>Edit</button>
            </div>
        </>
    )
}
