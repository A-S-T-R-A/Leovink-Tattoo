import { useState } from "react"
import { ArtistType, ColorType, ITattooImage, LanguageType, StyleType } from "shared/types/types"
import { EditModal } from "./EditModal/EditModal"
import { getImagesDoc, rewriteImagesDoc } from "shared/const/firebaseVariables"
import styles from "./EditTattooImage.module.scss"
import { isShallowEqual } from "shared/lib/isShallowEqual/isShallowEqual"
import { Alert } from "shared/ui/CustomNotifications"
import { defaultLanguage } from "shared/const/languages"
import { isDeepEqual } from "shared/lib/isDeepEqual/isDeepEqual"

export function EditTattooImage({
    id,
    triggerRefetch,
    unselectAllHandler,
}: {
    id: number
    triggerRefetch: () => void
    unselectAllHandler: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const defaultData = {
        id: -1,
        img: "",
        artist: "" as ArtistType,
        style: "" as StyleType,
        color: "" as ColorType,
        alt: { en: "", ru: "", ro: "" },
    }
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)
    const [newData, setNewData] = useState<ITattooImage>(defaultData)
    const [allImagesData, setAllImagesData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)

    const length = Object.keys(allImagesData).length

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    async function openClickHandler() {
        try {
            const currentDoc = await getImagesDoc()
            if (!currentDoc) return
            const currentData = currentDoc.data()
            const currentImg = { id: id, ...currentData[id] }
            setAllImagesData(currentData)
            setNewData(currentImg)
            setIsOpen(true)
        } catch (error) {
            Alert.error("Unexpected Error")
            setIsOpen(false)
        }
    }

    async function saveClickHandler() {
        if (!newData) return
        const { id: _, ...restNewData } = newData
        if (isDeepEqual(allImagesData[id], restNewData) && id === newData.id) {
            Alert.info("Nothing to Save")
            return
        }

        setIsLoading(true)
        const dataToUpload = { ...allImagesData }
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

                const queue = Object.keys(allImagesData)
                    .sort((a, b) => +a - +b)
                    .slice(minId, maxId + 1)

                const slots = queue.filter(item => +item != to)
                const itemsToPut = queue.filter(item => +item != from)

                for (let i = 0; i < slots.length; i++) {
                    dataToUpload[slots[i]] = allImagesData[itemsToPut[i]]
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
        setNewData(defaultData)
        setIsOpen(false)
    }

    function onClose() {
        setIsOpen(false)
    }

    return (
        <>
            <EditModal
                length={length}
                data={newData}
                isOpen={isOpen}
                isLoading={isLoading}
                onClose={onClose}
                setData={setNewData}
                currentLanguage={currentLanguage}
                onChangeLanguage={onChangeLanguage}
                saveClickHandler={saveClickHandler}
                discardClickHandler={discardClickHandler}
            />
            <button onClick={openClickHandler} className={styles.btn}>
                Edit
            </button>
        </>
    )
}
