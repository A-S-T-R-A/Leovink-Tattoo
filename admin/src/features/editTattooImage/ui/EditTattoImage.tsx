import { getDocs, orderBy, query, updateDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { ArtistType, ColorType, ITattooImage, StyleType } from "shared/types/types"
import { EditModal } from "./EditModal/EditModal"
import {
    getFirestoreDocumentByFileId,
    getFirestoreDocumentById,
    getImagesDoc,
    portfolioPicturesRef,
    rewriteImagesDoc,
} from "shared/const/firebaseVariables"
import styles from "./EditTattooImage.module.scss"

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
    }
    const [data, setData] = useState<ITattooImage>(defaultData)
    const [allImagesData, setAllImagesData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)

    const length = Object.keys(allImagesData).length

    async function openClickHandler() {
        try {
            const currentDoc = await getImagesDoc()
            if (!currentDoc) return
            const currentData = currentDoc.data()
            const currentImg = { id: id, ...currentData[id] }
            setAllImagesData(currentData)
            setData(currentImg)
            setIsOpen(true)
        } catch (error) {
            alert("Unexpected Error")
            setIsOpen(false)
        }
    }

    async function saveClickHandler() {
        if (!data) return
        setIsLoading(true)
        const newData = { ...allImagesData }
        newData[id] = data

        try {
            if (id === data.id) {
                await rewriteImagesDoc(newData)
                alert("Edit Success")
            } else {
                const from = id
                const to = data.id
                const minId = Math.min(from, to)
                const maxId = Math.max(from, to)

                const newData = { ...allImagesData }

                const queue = Object.keys(allImagesData)
                    .sort((a, b) => +a - +b)
                    .slice(minId, maxId + 1)

                const slots = queue.filter(item => +item != to)
                const itemsToPut = queue.filter(item => +item != from)

                for (let i = 0; i < slots.length; i++) {
                    newData[slots[i]] = allImagesData[itemsToPut[i]]
                }
                const { id: _, ...restData } = data
                newData[to] = { ...restData }

                await rewriteImagesDoc(newData)
                alert("Reorder Success")
            }
        } catch (error) {
            alert("Unexpected Error")
        }

        setIsLoading(false)
        setIsOpen(false)
        triggerRefetch?.()
    }

    function discardClickHandler() {
        setData(defaultData)
        setIsOpen(false)
    }

    function onClose() {
        setIsOpen(false)
    }

    return (
        <>
            <EditModal
                length={length}
                data={data}
                isOpen={isOpen}
                isLoading={isLoading}
                onClose={onClose}
                setData={setData}
                saveClickHandler={saveClickHandler}
                discardClickHandler={discardClickHandler}
            />
            <button onClick={openClickHandler} className={styles.btn}>
                Edit
            </button>
        </>
    )
}
