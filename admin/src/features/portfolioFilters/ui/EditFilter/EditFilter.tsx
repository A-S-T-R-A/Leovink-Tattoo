import { defaultNewFilter } from "features/portfolioFilters/const/const"
import { IFiltersData, IGlobalData, INewFilter } from "../../types/types"
import styles from "./EditFilter.module.scss"
import { defaultLanguage } from "shared/const/languages"
import { useEffect, useState } from "react"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { LanguageType } from "shared/types/types"
import { Alert } from "shared/ui/CustomNotifications"
import { isShallowEqual } from "shared/lib/isShallowEqual/isShallowEqual"
import { updateFiltersData } from "shared/const/firebaseVariables"
import { fetchAllImages } from "features/portfolioFilters/lib/fetchTattooImages"
import { uploadTattooImages } from "features/portfolioFilters/lib/uploadTattooImages"

export function EditFilter({
    id,
    data,
    title,
    triggerRefetch,
}: {
    id: number
    data: IGlobalData | null
    title: string
    triggerRefetch: () => void
}) {
    const [newAllFilter, setNewAllFilter] = useState<INewFilter>(defaultNewFilter)
    const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    useEffect(() => {
        refreshNewData()
    }, [data, currentLanguage, id])

    function refreshNewData() {
        if (data) {
            const initialNewAllFilter =
                data.filtersData.filters.filter(item => item.id === id)[0]?.title ||
                defaultNewFilter
            setNewAllFilter(initialNewAllFilter)
        }
    }

    async function editFilterForImages() {
        if (!data) return
        const previousTitle = data.filtersData.filters.filter(item => item.id === id)[0]?.title[
            defaultLanguage
        ]
        const currentTitle = newAllFilter[defaultLanguage]
        if (previousTitle === currentTitle) return

        const images = await fetchAllImages()
        const newImages = images.map(item => {
            if (item.filters[title]) {
                const newItem = JSON.parse(JSON.stringify(item))
                const prevFilterValue = newItem.filters[title]
                delete newItem.filters[title]
                newItem.filters[currentTitle] = prevFilterValue
                return newItem
            }
            return item
        })
        await uploadTattooImages(newImages)
    }

    async function saveClickHandler() {
        if (!data) return
        const initialNewAllFilter =
            data.filtersData.filters.filter(item => item.id === id)[0]?.title || defaultNewFilter
        if (isShallowEqual(newAllFilter, initialNewAllFilter)) {
            Alert.info("Nothing to save")
            return
        }

        setIsLoading(true)

        const newFiltersData = JSON.parse(JSON.stringify(data.filtersData)) as IFiltersData
        try {
            const dataToUpload = newFiltersData.filters.map(item => {
                if (item.id === id) {
                    return { ...item, title: newAllFilter }
                }
                return item
            })
            newFiltersData.filters = dataToUpload
            await updateFiltersData(newFiltersData)
            await editFilterForImages()
            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsOpen(false)
        setIsLoading(false)
        refreshNewData()
        triggerRefetch()
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        refreshNewData()
    }

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <ModalEditorWithTranslation
                isOpen={isOpen}
                onClose={() => setIsOpen(true)}
                currentLanguage={currentLanguage}
                onChangeLanguage={onChangeLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                <Input
                    value={newAllFilter[currentLanguage]}
                    onChange={value =>
                        setNewAllFilter((prev: any) => ({ ...prev, [currentLanguage]: value }))
                    }
                />
            </ModalEditorWithTranslation>
            <button className={styles.btn} onClick={() => setIsOpen(true)}>
                Edit Filter
            </button>
        </>
    )
}
