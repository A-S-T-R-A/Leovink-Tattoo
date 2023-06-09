import { LanguageType } from "shared/types/types"
import { IGlobalData } from "../../types/type"
import { useEffect, useState } from "react"
import { defaultLanguage } from "shared/const/languages"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { Input } from "shared/ui/Input/Input"
import { isDeepEqual } from "shared/lib/isDeepEqual/isDeepEqual"
import { Alert } from "shared/ui/CustomNotifications"
import { updateButtons } from "shared/const/firebaseVariables"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"
import styles from "./Buttons.module.scss"

const defaultNewAllData = {
    en: {
        cta: "",
        showMore: "",
        viewGallery: "",
        resetFilters: "",
    },
    ro: {
        cta: "",
        showMore: "",
        viewGallery: "",
        resetFilters: "",
    },
    ru: {
        cta: "",
        showMore: "",
        viewGallery: "",
        resetFilters: "",
    },
}

export function Buttons({
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
            setNewAllData(data.buttons)
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
        if (isDeepEqual(newAllData, data.buttons)) {
            Alert.info("Nothing to save")
            return
        }

        setIsLoading(true)

        try {
            await updateButtons(newAllData)
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
                withTranslation
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                {Object.keys(newAllData[defaultLanguage])
                    .sort()
                    .map((key: string, index) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        /* @ts-ignore */
                        const value = newAllData[currentLanguage][key]
                        return (
                            <Input
                                key={index}
                                label={key}
                                value={value}
                                onChange={value => {
                                    setNewAllData(prev => ({
                                        ...prev,
                                        [currentLanguage]: {
                                            ...prev[currentLanguage],
                                            [key]: value,
                                        },
                                    }))
                                }}
                            />
                        )
                    })}
            </ModalEditor>
            <div className={styles.buttonsContainer}>
                <p className={styles.buttonsTitle}>Buttons Name</p>
                {!!data &&
                    Object.entries(data.buttons[defaultLanguage])
                        .sort()
                        .map(([key, value], index) => (
                            <div className={styles.content} key={index}>
                                <strong>{key}</strong> : {value}
                            </div>
                        ))}
                <button className={styles.editBtn} onClick={() => setIsOpen(true)}>
                    Edit
                </button>
            </div>
        </>
    )
}
