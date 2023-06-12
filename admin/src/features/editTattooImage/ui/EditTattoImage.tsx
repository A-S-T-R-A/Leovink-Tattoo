import { getDocs, orderBy, query, updateDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { ArtistType, ColorType, ITattooImage, StyleType } from "shared/types/types"
import { EditModal } from "./EditModal/EditModal"
import {
    getFirestoreDocumentByFileId,
    getFirestoreDocumentById,
    portfolioPicturesRef,
} from "shared/const/firebaseVariables"
import styles from "./EditTattooImage.module.scss"
import { disableUi } from "shared/lib/disableUi/disableUi"

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
        id: 0,
        img: "",
        artist: "" as ArtistType,
        style: "" as StyleType,
        color: "" as ColorType,
    }
    const [data, setData] = useState<ITattooImage>(defaultData)
    const [isLoading, setIsLoading] = useState(false)

    async function openClickHandler() {
        try {
            const file = await getFirestoreDocumentById(id, portfolioPicturesRef)
            const fileData = file.data() as ITattooImage
            setData(fileData)
            setIsOpen(true)
        } catch (error) {
            alert("Unexpected Error")
            setIsOpen(false)
        }
    }

    /*  useEffect(() => {
        isLoading ? disableUi.disable() : disableUi.enable()
    }, [isLoading]) */

    async function saveClickHandler() {
        if (!data) return
        setIsLoading(true)

        try {
            const file = await getFirestoreDocumentById(id, portfolioPicturesRef)

            if (id === data.id) {
                await updateDoc(getFirestoreDocumentByFileId(file.id), data as any)
                alert("Edit Success")
                setIsOpen(false)
                triggerRefetch?.()
            } else {
                const from = id
                const to = data.id
                const minId = Math.min(from, to)

                const nq = query(
                    portfolioPicturesRef,
                    (orderBy("id", "asc"), where("id", ">=", minId))
                )
                const nd = await getDocs(nq)
                if (!nd.empty) {
                    const q = query(portfolioPicturesRef, orderBy("id", "asc"))
                    const d = await getDocs(q)
                    const stack = Array(d.size)
                        .fill("")
                        .map((_, index) => index + 1)
                        .slice(minId - 1)
                        .filter(item => item !== to)

                    const func = async (item: (typeof nd.docs)[0], index: number) => {
                        const id = minId + index
                        if (id === from) {
                            await updateDoc(getFirestoreDocumentByFileId(file.id), data as any)
                        } else {
                            await updateDoc(getFirestoreDocumentByFileId(item.id), { id: stack[0] })
                            stack.shift()
                        }
                        return new Promise(res => res(true))
                    }

                    for (let i = 0; i < nd.docs.length; i++) {
                        await func(nd.docs[i], i)
                    }
                }
                setIsLoading(false)
                alert("Success reorder")
                setIsOpen(false)
                unselectAllHandler()
                triggerRefetch?.()
            }
        } catch (error) {
            alert("Unexpected Error")
            triggerRefetch?.()
        }
        setIsLoading(false)
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
