import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import styles from "./EditParagraph.module.scss"
import { ITranslatedStepsData } from "pages/StepsPage/types/types"
import { Dropdown } from "shared/ui/Dropdown"
import { LanguageType } from "shared/types/types"
import {
    DATA_BUCKET,
    reformatArrayToObject,
    updateSectionData,
    uploadImageToBucket,
} from "shared/const/firebaseVariables"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../../../../firebase"
import { EditImage } from "features/editImage"

export function EditParagraph({
    data,
    length,
    id,
    triggerRefetch,
}: {
    data: ITranslatedStepsData | null
    length: number
    id: number
    triggerRefetch?: () => void
}) {
    const defaultData = { id: -1, img: "", title: "", description: "" }
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>("en")
    const [newImage, setNewImage] = useState("")
    const [newData, setNewData] = useState(() => data?.[currentLanguage][id] || defaultData)
    const [isOpen, setIsOpen] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
        setNewData(data?.[lang][id])
    }

    const dropdownNumbers = Array(length)
        .fill("")
        .map((_, index) => {
            const v = index.toString()
            return { label: v, value: v }
        })

    async function saveClickHandler() {
        if (!data || !newData) return
        const documentData = data[currentLanguage]
        const dataToUpload = { ...newData }

        try {
            if (newImage) {
                const rand = (Math.random() * 100000000).toFixed()
                const img = await uploadImageToBucket(newImage, `${DATA_BUCKET.steps}/st${rand}`)
                dataToUpload.img = img
            }

            documentData[newData.id] = dataToUpload
            const objectData = reformatArrayToObject(documentData)

            await updateSectionData(currentLanguage, "steps", objectData)
            alert("Success")
        } catch (error) {
            alert("Error")
        }
        triggerRefetch?.()
        setIsOpen(false)
    }

    function discardClickHandler() {
        setNewData(defaultData)
        setIsOpen(false)
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
                            url={newImage ? newImage : newData?.img || ""}
                            className={styles.img}
                        />
                        <EditImage onChange={val => setNewImage(val)} />
                    </div>
                    <div>
                        id:
                        <Dropdown
                            options={dropdownNumbers}
                            value={newData?.id.toString() || ""}
                            onChange={id => setNewData(prev => ({ ...prev, id: +id }))}
                        />
                    </div>
                    <Input
                        label="Title"
                        value={newData?.title || ""}
                        onChange={value => setNewData(prev => ({ ...prev, title: value }))}
                    />
                    <Textarea
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
