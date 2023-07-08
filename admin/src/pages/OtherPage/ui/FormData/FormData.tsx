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
import styles from "./FormData.module.scss"

const defaultNewAllData = {
    en: { name: "", phone: "", loading: "", success: "", error: "", validName: "", validPhone: "" },
    ro: { name: "", phone: "", loading: "", success: "", error: "", validName: "", validPhone: "" },
    ru: { name: "", phone: "", loading: "", success: "", error: "", validName: "", validPhone: "" },
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
                <Input
                    label="Valid Name"
                    value={newAllData[currentLanguage].validName}
                    onChange={validName =>
                        setNewAllData(prev => ({
                            ...prev,
                            [currentLanguage]: { ...prev[currentLanguage], validName },
                        }))
                    }
                />
                <Input
                    label="Valid Phone"
                    value={newAllData[currentLanguage].validPhone}
                    onChange={validPhone =>
                        setNewAllData(prev => ({
                            ...prev,
                            [currentLanguage]: { ...prev[currentLanguage], validPhone },
                        }))
                    }
                />
            </ModalEditor>
            <div className={styles.formsContainer}>
                <p className={styles.formsTitle}>Form Data</p>
                <div className={styles.content}>
                    <strong>Name placeholder:</strong>
                    {data && data?.formData[defaultLanguage].name}
                </div>
                <div className={styles.content}>
                    <strong>Phone placeholder:</strong>
                    {data && data?.formData[defaultLanguage].phone}
                </div>
                <div className={styles.content}>
                    <strong>Loading message:</strong>
                    {data && data?.formData[defaultLanguage].loading}
                </div>
                <div className={styles.content}>
                    <strong>Success message:</strong>
                    {data && data?.formData[defaultLanguage].success}
                </div>
                <div className={styles.content}>
                    <strong>Error message:</strong> {data && data?.formData[defaultLanguage].error}
                </div>
                <div className={styles.content}>
                    <strong>Valid name:</strong> {data && data?.formData[defaultLanguage].validName}
                </div>
                <div className={styles.content}>
                    <strong>Valid phone:</strong>
                    {data && data?.formData[defaultLanguage].validPhone}
                </div>
                <button className={styles.editBtn} onClick={() => setIsOpen(true)}>
                    Edit
                </button>
            </div>
        </>
    )
}
