import { useEffect, useState } from "react"
import { IGlobalData } from "../../types/type"
import { defaultLanguage } from "shared/const/languages"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { LanguageType } from "shared/types/types"
import { Input } from "shared/ui/Input/Input"
import { isDeepEqual } from "shared/lib/isDeepEqual/isDeepEqual"
import { Alert } from "shared/ui/CustomNotifications"
import { updateSectionNames } from "shared/const/firebaseVariables"

const defaultNewAllData = {
    en: {
        portfolio: "",
        steps: "",
        services: "",
        artists: "",
        testimonials: "",
        faq: "",
        form: "",
    },
    ro: {
        portfolio: "",
        steps: "",
        services: "",
        artists: "",
        testimonials: "",
        faq: "",
        form: "",
    },
    ru: {
        portfolio: "",
        steps: "",
        services: "",
        artists: "",
        testimonials: "",
        faq: "",
        form: "",
    },
}

export function SectionNames({
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
            setNewAllData(data.sectionNames)
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
        if (isDeepEqual(newAllData, data.sectionNames)) {
            Alert.info("Nothing to save")
            return
        }

        setIsLoading(true)

        try {
            await updateSectionNames(newAllData)
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
                {Object.entries(newAllData[defaultLanguage]).map(([key, value], index) => (
                    <Input
                        key={index}
                        label={key}
                        value={value}
                        onChange={value => {
                            setNewAllData(prev => ({
                                ...prev,
                                [currentLanguage]: { ...prev[currentLanguage], [key]: value },
                            }))
                        }}
                    />
                ))}
            </ModalEditorWithTranslation>
            <div>
                {!!data &&
                    Object.entries(data.sectionNames[defaultLanguage]).map(
                        ([key, value], index) => (
                            <p key={index}>
                                {key} : {value}
                            </p>
                        )
                    )}
                <button onClick={() => setIsOpen(true)}>Edit</button>
            </div>
        </>
    )
}
