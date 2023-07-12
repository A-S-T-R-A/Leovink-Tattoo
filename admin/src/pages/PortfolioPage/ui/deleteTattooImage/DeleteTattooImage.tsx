import { getStorage, ref, deleteObject } from "firebase/storage"
import {
    TATTOO_IMAGES_BUCKET,
    getImageNameByUrl,
    getImagesDoc,
    rewriteImagesDoc,
} from "shared/const/firebaseVariables"
import { useState } from "react"
import { Modal } from "shared/ui/Modal"
import { Alert, Confirm } from "shared/ui/CustomNotifications"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { DeleteIcon } from "shared/assets/icons"
import styles from "./DeleteTattooImage.module.scss"

export function DeleteTattooImage({
    id,
    triggerRefetch,
    unselectAllHandler,
    className,
}: {
    id: number
    triggerRefetch: () => void
    unselectAllHandler: () => void
    className: string
}) {
    const [isLoading, setIsLoading] = useState(false)

    const storage = getStorage()

    async function clickHandler() {
        const isConfirmed = await Confirm(`Delete image id:${id}?`)
        if (!isConfirmed) return

        setIsLoading(true)
        try {
            const currentDoc = await getImagesDoc()
            if (!currentDoc) return
            const currentData = currentDoc.data()
            const currentImg = currentData[id]

            const imgName = getImageNameByUrl(currentImg.img)
            const imgRef = ref(storage, `${TATTOO_IMAGES_BUCKET}/${imgName}`)
            deleteObject(imgRef)

            const queue = Object.keys(currentData)
                .sort((a, b) => +a - +b)
                .slice(+id)

            const newData = { ...currentData }
            queue.forEach(itemId => {
                newData[+itemId] = currentData[+itemId + 1]
            })
            delete newData[queue[queue.length - 1]]

            await rewriteImagesDoc(newData)
            Alert.success("Delete Success")
        } catch (error) {
            Alert.error("Delete Error")
        }
        unselectAllHandler()
        triggerRefetch?.()
        setIsLoading(false)
    }

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <div onClick={clickHandler} className={className}>
                <DeleteIcon />
            </div>
        </>
    )
}
