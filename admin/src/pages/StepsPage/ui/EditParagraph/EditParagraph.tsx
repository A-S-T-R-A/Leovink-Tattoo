import { useEffect, useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import styles from "./EditParagraph.module.scss"
import { ITranslatedStepsData } from "pages/StepsPage/types/types"
import { LanguageType } from "shared/types/types"
import {
    DATA_BUCKET,
    deleteImageFromBucket,
    reformatArrayToObject,
    updateSectionData,
    uploadImageToBucket,
} from "shared/const/firebaseVariables"
import { EditImage } from "features/editImage"
import { isShallowEqual } from "shared/lib/isShallowEqual/isShallowEqual"
import { allLanguages } from "shared/const/languages"
import { Alert } from "shared/ui/CustomNotifications"

export function EditParagraph({
    data,
    id,
    triggerRefetch,
}: {
    data: ITranslatedStepsData | null
    id: number
    triggerRefetch?: () => void
}) {
    const defaultPreviewImage = { blob: "", url: "" }
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>("en")
    const defaultData = {
        img: "",
        title: "",
        description: "",
    }
    const [previewImage, setPreviewImage] = useState(defaultPreviewImage)
    const [newData, setNewData] = useState(defaultData)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        refreshNewData()
    }, [data, currentLanguage, id])

    function refreshNewData() {
        if (data) {
            setNewData(data[currentLanguage][id])
        }
    }

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
        if (data) setNewData(data[lang][id])
    }

    async function saveClickHandler() {
        if (!data || !newData) return
        if (isShallowEqual(newData, data[currentLanguage][id]) && previewImage.url === "") {
            Alert.info("Nothing to save")
            setIsOpen(false)
            return
        }

        const documentData = [...data[currentLanguage]]
        const dataToUpload = { ...newData }

        try {
            if (previewImage.url !== "") {
                const rand = (Math.random() * 100000000).toFixed()
                const img = await uploadImageToBucket(
                    previewImage.blob,
                    `${DATA_BUCKET.steps}/st${rand}`
                )
                if (!img) throw new Error()

                if (newData.img) {
                    deleteImageFromBucket(newData.img, DATA_BUCKET.steps)
                }

                dataToUpload.img = img

                const allStepsData = { ...data }

                for (const lang of allLanguages) {
                    if (lang === currentLanguage) {
                        allStepsData[lang][id] = dataToUpload
                    }
                    allStepsData[lang][id].img = img
                    const objectData = reformatArrayToObject(allStepsData[lang])
                    await updateSectionData(lang, "steps", objectData)
                }
            } else {
                console.log(dataToUpload)
                documentData[id] = dataToUpload
                const objectData = reformatArrayToObject(documentData)
                await updateSectionData(currentLanguage, "steps", objectData)
            }

            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }
        setIsOpen(false)
        setPreviewImage(defaultPreviewImage)
        triggerRefetch?.()
    }

    function discardClickHandler() {
        setIsOpen(false)
        refreshNewData()
        setPreviewImage(defaultPreviewImage)
    }

    function editImageChangeHandler(blob: any) {
        const url = URL.createObjectURL(blob)
        setPreviewImage({ blob, url })
    }

    return (
        <>
            <ModalEditorWithTranslation
                isOpen={isOpen}
                onClose={onClose}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                <div className={styles.container}>
                    <div className={styles.imgContainer}>
                        <ModalImage
                            url={previewImage.url ? previewImage.url : newData?.img || ""}
                            className={styles.img}
                        />
                        <EditImage onChange={editImageChangeHandler} />
                    </div>
                    <div>id: {id}</div>
                    <Input
                        label="Title"
                        value={newData?.title || ""}
                        onChange={value => setNewData(prev => ({ ...prev, title: value }))}
                    />
                    <Textarea
                        className={styles.textarea}
                        label="Description"
                        value={newData.description}
                        onChange={value => setNewData(prev => ({ ...prev, description: value }))}
                    />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
