import { deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { getStorage, ref, deleteObject } from "firebase/storage"
import { getImageNameByUrl } from "../lib/getImageNameByUrl"
import {
    TATTOO_IMAGES_BUCKET,
    getFirestoreDocumentByFileId,
    getFirestoreDocumentById,
    portfolioPicturesRef,
} from "shared/const/firebaseVariables"

export function DeleteTattooImage({
    id,
    triggerRefetch,
}: {
    id: number
    triggerRefetch: () => void
}) {
    const storage = getStorage()

    async function clickHandler() {
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
                triggerRefetch?.()
            }

            const updateIdPromises = nd.docs.map(async (item, index) => {
                await updateDoc(getFirestoreDocumentByFileId(item.id), {
                    id: id + index,
                })
                return new Promise(res => res(true))
            })

            await Promise.all(updateIdPromises)
            alert("Delete Success")
            triggerRefetch?.()
        } catch (error) {
            alert("Delete Error")
            triggerRefetch?.()
        }
    }

    return <button onClick={clickHandler}>Delete</button>
}
