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
import { Alert, Confirm } from "shared/ui/CustomNotifications"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import styles from "./DeleteBulkTattooImages.module.scss"

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
            Alert.warning("You have to be logged as admin to perform this action")
            return
        }
        const isConfirmed = await Confirm(`Delete ${imagesId.length} images?`)
        if (!isConfirmed) return

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
            Alert.success("Delete Success")
        } catch (error) {
            Alert.error("Delete Error")
        }

        setIsLoading(false)
        unselectAllHandler?.()
        triggerRefetch?.()
    }

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <button onClick={clickHandler} className={styles.btn}>
                Delete Selected
            </button>
        </>
    )
}
