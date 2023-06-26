import {
    TATTOO_IMAGES_BUCKET,
    getImageNameByUrl,
    getImagesDoc,
    rewriteImagesDoc,
} from "shared/const/firebaseVariables"
import { deleteObject, getStorage, ref } from "firebase/storage"
import { Modal } from "shared/ui/Modal"
import { useState } from "react"
import { useUserRole } from "features/authByGoogle"

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

    const storage = getStorage()
    const role = useUserRole()

    async function clickHandler() {
        if (role !== "admin") {
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
            deleteObject(imgRef)
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
