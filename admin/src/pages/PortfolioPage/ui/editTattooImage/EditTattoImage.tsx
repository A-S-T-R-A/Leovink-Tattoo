import { useState } from "react"
import { LanguageType } from "shared/types/types"
import { EditModal } from "./EditModal/EditModal"
import { reformatArrayToObject, rewriteImagesDoc } from "shared/const/firebaseVariables"
import styles from "./EditTattooImage.module.scss"
import { Alert } from "shared/ui/CustomNotifications"
import { defaultNewData } from "../../const/const"
import { isDeepEqual } from "shared/lib/isDeepEqual/isDeepEqual"
import { ITattooImage } from "../../types/types"
import { IFilter } from "features/portfolioFilters/types/types"
import { defaultLanguage } from "shared/const/languages"
import { EditIcon } from "shared/assets/icons"

export function EditTattooImage({
    id,
    data,
    filtersData,
    triggerRefetch,
    unselectAllHandler,
    className,
}: {
    id: number
    data: ITattooImage[]
    filtersData: IFilter[]
    triggerRefetch: () => void
    unselectAllHandler: () => void
    className?: string
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [newData, setNewData] = useState<ITattooImage>(defaultNewData)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)
    const [isLoading, setIsLoading] = useState(false)

    const length = data.length
    console.log(data.map((_, i) => i).sort((a, b) => +a - +b))
    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    async function openClickHandler() {
        const currentImg = { ...data[id], id: id }
        setNewData(currentImg)
        setIsOpen(true)
    }

    async function saveClickHandler() {
        if (!newData) return
        const { id: _, ...restNewData } = newData
        if (isDeepEqual(data[id], newData) && id === newData.id) {
            Alert.info("Nothing to Save")
            return
        }

        setIsLoading(true)
        const dataToUpload = reformatArrayToObject(data)
        const updatedRestData = JSON.parse(JSON.stringify(restNewData)) as typeof restNewData

        for (const key in updatedRestData.filters) {
            if (updatedRestData.filters[key] === "Unassigned") {
                updatedRestData.filters[key] = ""
            }
        }

        dataToUpload[id] = updatedRestData
        try {
            if (id === newData.id) {
                await rewriteImagesDoc(dataToUpload)
                Alert.success("Edit Success")
            } else {
                const from = id
                const to = newData.id
                const minId = Math.min(from, to)
                const maxId = Math.max(from, to)

                const queue = data
                    .map((_, i) => i)
                    .sort((a, b) => +a - +b)
                    .slice(minId, maxId + 1)

                const slots = queue.filter(item => +item != to)
                const itemsToPut = queue.filter(item => +item != from)
                const intermediateData = JSON.parse(JSON.stringify(dataToUpload))
                for (let i = 0; i < slots.length; i++) {
                    dataToUpload[slots[i]] = intermediateData[itemsToPut[i]]
                }
                dataToUpload[to] = updatedRestData

                await rewriteImagesDoc(dataToUpload)
                Alert.success("Reorder Success")
            }
        } catch (error) {
            Alert.error("Unexpected Error")
        }

        setIsLoading(false)
        setIsOpen(false)
        unselectAllHandler()
        triggerRefetch?.()
    }

    function discardClickHandler() {
        setNewData(defaultNewData)
        setIsOpen(false)
        setIsLoading(false)
    }

    function onClose() {
        setIsOpen(false)
    }

    return (
        <>
            <EditModal
                length={length}
                newData={newData}
                isOpen={isOpen}
                isLoading={isLoading}
                onClose={onClose}
                setNewData={setNewData}
                filtersData={filtersData}
                currentLanguage={currentLanguage}
                onChangeLanguage={onChangeLanguage}
                saveClickHandler={saveClickHandler}
                discardClickHandler={discardClickHandler}
            />
            <div onClick={openClickHandler} className={className}>
                <EditIcon />
            </div>
        </>
    )
}
