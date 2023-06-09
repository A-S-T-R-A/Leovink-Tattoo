import { useState } from "react"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"
import { Input } from "shared/ui/Input/Input"
import { defaultLanguage } from "shared/const/languages"
import { LanguageType } from "shared/types/types"
import { Alert } from "shared/ui/CustomNotifications"
import { defaultNewFilter } from "../../const/const"
import { updateFiltersData } from "shared/const/firebaseVariables"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { IFiltersData, INewFilter } from "../../types/types"
import styles from "./AddNewFilter.module.scss"
import { IGlobalData } from "pages/OtherPage"

export function AddNewFilter({
    data,
    triggerRefetch,
}: {
    data: IGlobalData | null
    triggerRefetch: () => void
}) {
    const [newFilter, setNewFilter] = useState<INewFilter>(defaultNewFilter)
    const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    async function saveClickHandler() {
        if (!data) return
        if (Object.values(newFilter).some(item => item === "")) {
            Alert.info("You have to fill up all languages")
            return
        }
        setIsLoading(true)

        const newFiltersData = JSON.parse(JSON.stringify(data.filtersData)) as IFiltersData
        const newId = Math.max(...newFiltersData.filters.map(item => item.id)) + 1
        try {
            const filterToUpload = {
                id: newId,
                title: newFilter,
                items: [],
            }
            newFiltersData.filters.push(filterToUpload)
            await updateFiltersData(newFiltersData)
            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsOpen(false)
        setIsLoading(false)
        setNewFilter(defaultNewFilter)
        triggerRefetch()
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        setNewFilter(defaultNewFilter)
    }

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <ModalEditor
                withTranslation
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                currentLanguage={currentLanguage}
                onChangeLanguage={onChangeLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                <Input
                    value={newFilter[currentLanguage]}
                    onChange={value =>
                        setNewFilter((prev: any) => ({ ...prev, [currentLanguage]: value }))
                    }
                />
            </ModalEditor>
            <button className={styles.btn} onClick={() => setIsOpen(true)}>
                Add New Filter
            </button>
        </>
    )
}
