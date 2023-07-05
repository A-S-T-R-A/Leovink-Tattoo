import { useEffect, useState } from "react"
import styles from "./EditItem.module.scss"
import { IFiltersData, IGlobalData, INewFilter } from "../../types/types"
import { defaultNewFilter } from "../../const/const"
import { defaultLanguage } from "shared/const/languages"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { Input } from "shared/ui/Input/Input"
import { LanguageType } from "shared/types/types"
import { isShallowEqual } from "shared/lib/isShallowEqual/isShallowEqual"
import { Alert } from "shared/ui/CustomNotifications"
import { updateFiltersData } from "shared/const/firebaseVariables"
import { fetchAllImages } from "../../lib/fetchTattooImages"
import { uploadTattooImages } from "features/portfolioFilters/lib/uploadTattooImages"

export function EditItem({
    parentId,
    data,
    filterKey,
    parentTitle,
    triggerRefetch,
}: {
    parentId: number
    data: IGlobalData | null
    filterKey: string
    parentTitle: string
    triggerRefetch: () => void
}) {
    const [newAllItem, setNewAllItem] = useState<INewFilter>(defaultNewFilter)
    const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        refreshNewData()
    }, [data, currentLanguage, parentId])

    function refreshNewData() {
        if (data) {
            const initialNewAllFilter =
                data.filtersData.filters
                    .filter(item => item.id === parentId)[0]
                    .items.filter(item => item.key === filterKey)[0].label || defaultNewFilter

            setNewAllItem(initialNewAllFilter)
        }
    }

    async function editFilterItemForImages() {
        if (!data) return
        const currentKey = newAllItem[defaultLanguage]
        if (filterKey === currentKey) return

        const images = await fetchAllImages()
        const newImages = images.map(item => {
            if (item.filters[parentTitle] === filterKey) {
                console.log(item.filters)
                const newItem = JSON.parse(JSON.stringify(item))
                newItem.filters[parentTitle] = currentKey
                return newItem
            }
            return item
        })
        await uploadTattooImages(newImages)
    }

    async function saveClickHandler() {
        if (!data) return
        const initialNewAllFilter =
            data.filtersData.filters
                .filter(item => item.id === parentId)[0]
                .items.filter(item => item.key === filterKey)[0].label || defaultNewFilter
        if (isShallowEqual(newAllItem, initialNewAllFilter)) {
            Alert.info("Nothing to save")
            return
        }

        setIsLoading(true)

        const newFiltersData = JSON.parse(JSON.stringify(data.filtersData)) as IFiltersData
        try {
            const dataToUpload = newFiltersData.filters.map(item => {
                if (item.id === parentId) {
                    const newItems = item.items.map(innerItem => {
                        if (innerItem.key === filterKey) {
                            return {
                                ...innerItem,
                                label: newAllItem,
                                key: newAllItem[defaultLanguage],
                            }
                        }
                        return innerItem
                    })

                    return { ...item, items: newItems }
                }
                return item
            })

            newFiltersData.filters = dataToUpload
            await updateFiltersData(newFiltersData)
            await editFilterItemForImages()
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

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
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
                    value={newAllItem[currentLanguage]}
                    onChange={value =>
                        setNewAllItem((prev: any) => ({ ...prev, [currentLanguage]: value }))
                    }
                />
            </ModalEditorWithTranslation>
            <button className={styles.btn} onClick={() => setIsOpen(true)}>
                Edit Item
            </button>
        </>
    )
}
