import { getImageNameByUrl } from "../lib/getImageNameByUrl"
import {
    TATTOO_IMAGES_BUCKET,
    getImagesDoc,
    rewriteImagesDoc,
} from "shared/const/firebaseVariables"
import { deleteObject, getStorage, ref } from "firebase/storage"
import { useIsAdmin } from "features/authByGoogle"
import { Modal } from "shared/ui/Modal"
import { useEffect, useState } from "react"
import { disableUi } from "shared/lib/disableUi/disableUi"

export function DeleteBulkTattooImages({
    imagesId,
    triggerRefetch,
    unselectAllHandler,
}: {
    imagesId: number[]
    triggerRefetch: () => void
    unselectAllHandler: () => void
}) {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        isLoading ? disableUi.disable() : disableUi.enable()
    }, [isLoading])

    const storage = getStorage()
    const isAdmin = useIsAdmin()

    async function clickHandler() {
        if (!isAdmin) {
            alert("You have to be logged as admin to perform this action")
            return
        }

        if (!confirm(`Delete ${imagesId.length} images?`)) return

        setIsLoading(true)

        const currentDoc = await getImagesDoc()
        if (!currentDoc) return
        const currentData = currentDoc.data()
        const newData: any = {}
        let i = 0

        for (let i = 0; i < imagesId.length; i++) {
            const currentImg = currentData[imagesId[i]]
            const imgName = getImageNameByUrl(currentImg.img)
            const imgRef = ref(storage, `${TATTOO_IMAGES_BUCKET}/${imgName}`)
            await deleteObject(imgRef)
        }

        Object.keys(currentData).forEach(key => {
            if (!imagesId.includes(+key)) {
                newData[i] = currentData[key]
                i++
            }
        })

        try {
            await rewriteImagesDoc(newData)
            alert("Delete Success")
        } catch (error) {
            alert("Delete Error")
        }

        setIsLoading(false)
        unselectAllHandler?.()
        triggerRefetch?.()
    }

    return (
        <>
            <Modal isOpen={isLoading} onClose={() => null}>
                Loading...
            </Modal>
            <button onClick={clickHandler}>Delete Selected</button>
        </>
    )
}
