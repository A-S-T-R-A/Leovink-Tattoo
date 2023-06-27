import { useState } from "react"
import { EditModal } from "./EditModal/EditModal"
import { reformatArrayToObject, rewriteImagesDoc } from "shared/const/firebaseVariables"
import styles from "./EditTattooImage.module.scss"
import { Alert } from "shared/ui/CustomNotifications"
import { defaultNewData } from "../../const/const"
import { IFilters } from "features/portfolioFilters/types/types"
import { isDeepEqual } from "shared/lib/isDeepEqual/isDeepEqual"
import { ITattooImage } from "../../types/types"

export function EditTattooImage({
    id,
    data,
    filtersData,
    triggerRefetch,
    unselectAllHandler,
}: {
    id: number
    data: ITattooImage[]
    filtersData: IFilters | null
    triggerRefetch: () => void
    unselectAllHandler: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [newData, setNewData] = useState<ITattooImage>(defaultNewData)
    const [isLoading, setIsLoading] = useState(false)

    const length = data.length

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
        dataToUpload[id] = restNewData
        try {
            if (id === newData.id) {
                await rewriteImagesDoc(dataToUpload)
                Alert.success("Edit Success")
            } else {
                const from = id
                const to = newData.id
                const minId = Math.min(from, to)
                const maxId = Math.max(from, to)

                const queue = Object.keys(data)
                    .sort((a, b) => +a - +b)
                    .slice(minId, maxId + 1)

                const slots = queue.filter(item => +item != to)
                const itemsToPut = queue.filter(item => +item != from)

                for (let i = 0; i < slots.length; i++) {
                    dataToUpload[slots[i]] = dataToUpload[itemsToPut[i]]
                }

                dataToUpload[to] = restNewData

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
                setData={setNewData}
                filtersData={filtersData}
                saveClickHandler={saveClickHandler}
                discardClickHandler={discardClickHandler}
            />
            <button onClick={openClickHandler} className={styles.btn}>
                Edit
            </button>
        </>
    )
}
