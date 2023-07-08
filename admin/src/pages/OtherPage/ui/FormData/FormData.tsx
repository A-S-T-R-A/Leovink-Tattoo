import { defaultLanguage } from "shared/const/languages"
import { IGlobalData } from "../../types/type"
import { useEffect, useState } from "react"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { LanguageType } from "shared/types/types"
import { Input } from "shared/ui/Input/Input"
import { isDeepEqual } from "shared/lib/isDeepEqual/isDeepEqual"
import { Alert } from "shared/ui/CustomNotifications"
import { updateFormData } from "shared/const/firebaseVariables"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"

const defaultNewAllData = {
    en: { name: "", phone: "", loading: "", success: "", error: "" },
    ro: { name: "", phone: "", loading: "", success: "", error: "" },
    ru: { name: "", phone: "", loading: "", success: "", error: "" },
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
            <ModalEditor
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
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
                <Input
                    label="Loading"
                    value={newAllData[currentLanguage].loading}
                    onChange={loading =>
                        setNewAllData(prev => ({
                            ...prev,
                            [currentLanguage]: { ...prev[currentLanguage], loading },
                        }))
                    }
                />
                <Input
                    label="Success"
                    value={newAllData[currentLanguage].success}
                    onChange={success =>
                        setNewAllData(prev => ({
                            ...prev,
                            [currentLanguage]: { ...prev[currentLanguage], success },
                        }))
                    }
                />
                <Input
                    label="Error"
                    value={newAllData[currentLanguage].error}
                    onChange={error =>
                        setNewAllData(prev => ({
                            ...prev,
                            [currentLanguage]: { ...prev[currentLanguage], error },
                        }))
                    }
                />
            </ModalEditor>
            <div>
                <div>Name placeholder: {data && data?.formData[defaultLanguage].name}</div>
                <div>Phone placeholder: {data && data?.formData[defaultLanguage].phone}</div>
                <div>Loading message: {data && data?.formData[defaultLanguage].loading}</div>
                <div>Success message: {data && data?.formData[defaultLanguage].success}</div>
                <div>Error message: {data && data?.formData[defaultLanguage].error}</div>
                <button onClick={() => setIsOpen(true)}>Edit</button>
            </div>
        </>
    )
}
