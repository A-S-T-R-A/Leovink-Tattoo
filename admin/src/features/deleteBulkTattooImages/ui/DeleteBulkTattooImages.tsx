import { getImageNameByUrl } from "../lib/getImageNameByUrl"
import {
    TATTOO_IMAGES_BUCKET,
    getFirestoreDocumentByFileId,
    getFirestoreDocumentById,
    portfolioPicturesRef,
} from "shared/const/firebaseVariables"
import { deleteObject, getStorage, ref } from "firebase/storage"
import { deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore"

export function DeleteBulkTattooImages({
    imagesId,
    triggerRefetch,
    unselectAllHandler,
}: {
    imagesId: number[]
    triggerRefetch: () => void
    unselectAllHandler: () => void
}) {
    const storage = getStorage()

    async function clickHandler() {
        //if(noAdmin) alert return

        const deletePromises = imagesId.map(async item => {
            try {
                const file = await getFirestoreDocumentById(item, portfolioPicturesRef)
                const imgLink = file.data().img
                const imgName = getImageNameByUrl(imgLink)
                const imgRef = ref(storage, `${TATTOO_IMAGES_BUCKET}/${imgName}`)
                await deleteObject(imgRef)
                await deleteDoc(getFirestoreDocumentByFileId(file.id))
                return new Promise(res => res(true))
            } catch (error) {
                alert("Unexpected Error")
                return new Promise((_, rej) => rej())
            }
        })

        try {
            await Promise.all(deletePromises)
            const id = Math.min(...imagesId)
            const nq = query(portfolioPicturesRef, where("id", ">", id))
            const nd = await getDocs(nq)

            if (nd.empty) {
                alert("Delete Success")
                unselectAllHandler?.()
                triggerRefetch?.()
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
            unselectAllHandler?.()
            triggerRefetch?.()
        } catch (error) {
            alert("Delete Error")
            unselectAllHandler?.()
            triggerRefetch?.()
        }
    }

    return <button onClick={clickHandler}>Delete Selected</button>
}
