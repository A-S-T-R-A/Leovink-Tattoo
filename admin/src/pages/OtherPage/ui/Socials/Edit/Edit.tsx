import { EditImage } from "features/editImage"
import { IGlobalData, IPreviewImage, ISocialMedia } from "../../../types/type"
import { useEffect, useState } from "react"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { defaultLanguage } from "shared/const/languages"
import { Input } from "shared/ui/Input/Input"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { defaultPreviewImage } from "../../../const/defaults"
import styles from "./Edit.module.scss"
import { Alert } from "shared/ui/CustomNotifications"
import { isShallowEqual } from "shared/lib/isShallowEqual/isShallowEqual"
import {
    DATA_BUCKET,
    deleteImageFromBucket,
    updateSocialsData,
    uploadImageToBucket,
} from "shared/const/firebaseVariables"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"

export function Edit({
    data,
    id,
    triggerRefetch,
}: {
    data: IGlobalData | null
    id: number
    triggerRefetch: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [newData, setNewData] = useState<ISocialMedia | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState<IPreviewImage>(defaultPreviewImage)

    useEffect(() => {
        refreshNewData()
    }, [])

    function refreshNewData() {
        if (data) {
            setNewData(data.socialsData.filter(item => item.id === id)[0])
            setPreviewImage(defaultPreviewImage)
        }
    }

    function onClose() {
        setIsOpen(false)
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        refreshNewData()
        triggerRefetch()
    }

    function editImageChangeHandler(blob: any) {
        const url = URL.createObjectURL(blob)
        setPreviewImage({ blob, url })
    }

    async function saveClickHandler() {
        if (!data || !newData) return
        const prevData = data.socialsData.filter(item => item.id === id)[0]
        if (isShallowEqual(prevData, newData) && previewImage.url === "") {
            Alert.info("Nothing to save")
            return
        }

        setIsLoading(true)

        let socialsDataToUpload = JSON.parse(JSON.stringify(data.socialsData)) as ISocialMedia[]

        try {
            let newImg: null | string = null

            if (previewImage.url !== "") {
                const rand = (Math.random() * 100000000).toFixed()
                newImg = await uploadImageToBucket(
                    previewImage.blob,
                    `${DATA_BUCKET.artists}/a${rand}`
                )
            }

            if (prevData.icon !== "") {
                deleteImageFromBucket(newData.icon, DATA_BUCKET.global)
            }

            socialsDataToUpload = socialsDataToUpload.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        link: newData.link || "",
                        icon: newImg || newData.icon,
                    }
                }
                return item
            })

            await updateSocialsData(socialsDataToUpload)
            Alert.success("Success")
        } catch (error) {
            Alert.success("Error")
        }

        setIsLoading(false)
        setIsOpen(false)
        setIsLoading(false)
        triggerRefetch()
    }

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <ModalEditor
                isOpen={isOpen}
                onClose={onClose}
                onChangeLanguage={() => null}
                currentLanguage={defaultLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                <div className={styles.cont}>
                    <ModalImage
                        url={previewImage.url || newData?.icon || ""}
                        className={styles.img}
                    />
                    <EditImage onChange={editImageChangeHandler} />
                    <Input
                        value={newData?.link || ""}
                        onChange={link => setNewData((prev: any) => ({ ...prev, link }))}
                    />
                </div>
            </ModalEditor>
            <button className={styles.editBtn} onClick={() => setIsOpen(true)}>
                Edit
            </button>
        </>
    )
}
