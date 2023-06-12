import { deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { getStorage, ref, deleteObject } from "firebase/storage"
import { getImageNameByUrl } from "../lib/getImageNameByUrl"
import {
    TATTOO_IMAGES_BUCKET,
    getFirestoreDocumentByFileId,
    getFirestoreDocumentById,
    portfolioPicturesRef,
} from "shared/const/firebaseVariables"
import { useEffect, useState } from "react"
import { disableUi } from "shared/lib/disableUi/disableUi"
import { Modal } from "shared/ui/Modal"

export function DeleteTattooImage({
    id,
    triggerRefetch,
    unselectAllHandler,
}: {
    id: number
    triggerRefetch: () => void
    unselectAllHandler: () => void
}) {
    const [isLoading, setIsLoading] = useState(false)

    /*   useEffect(() => {
        isLoading ? disableUi.disable() : disableUi.enable()
    }, [isLoading]) */

    const storage = getStorage()

    async function clickHandler() {
        if (!confirm(`Delete image id:${id}?`)) return

        setIsLoading(true)
        try {
            const file = await getFirestoreDocumentById(id, portfolioPicturesRef)
            const imgLink = file.data().img
            const imgName = getImageNameByUrl(imgLink)
            const imgRef = ref(storage, `${TATTOO_IMAGES_BUCKET}/${imgName}`)

            await deleteObject(imgRef)
            await deleteDoc(getFirestoreDocumentByFileId(file.id))
            const nq = query(portfolioPicturesRef, where("id", ">", id))
            const nd = await getDocs(nq)
            if (nd.empty) {
                alert("Delete Success")
                unselectAllHandler()
                triggerRefetch?.()
                setIsLoading(false)
                return
            }

            const updateIdPromises = nd.docs.map(async (item, index) => {
                await updateDoc(getFirestoreDocumentByFileId(item.id), {
                    id: id + index,
                })
                return new Promise(res => res(true))
            })

            await Promise.all(updateIdPromises)
            alert("Delete Success")
            unselectAllHandler()
            triggerRefetch?.()
        } catch (error) {
            alert("Delete Error")
            unselectAllHandler()
            triggerRefetch?.()
        }
        setIsLoading(false)
    }

    return (
        <>
            <Modal isOpen={isLoading} onClose={() => null}>
                Loading...
            </Modal>
            <button onClick={clickHandler}>Delete</button>
        </>
    )
}
