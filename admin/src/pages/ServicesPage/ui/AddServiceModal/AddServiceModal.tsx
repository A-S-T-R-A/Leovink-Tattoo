import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import styles from "./AddServiceModal.module.scss"
import { LanguageType } from "shared/types/types"
import { INewAllData, IPreviewImage, IServiceData, ITranslatedServiceData } from "../../types/types"
import { ImagesList } from "../ImagesList/ImagesList"
import { EditImage } from "features/editImage"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { isAllLanguagesFilledUp } from "../../lib/isAllLanguagesFilledUp"
import {
    DATA_BUCKET,
    reformatArrayToObject,
    updateSectionData,
    uploadImageToBucket,
} from "shared/const/firebaseVariables"

export function AddServiceModal({
    data,
    triggerRefetch,
}: {
    data: ITranslatedServiceData | null
    triggerRefetch?: () => void
}) {
    const defaultNewAllData = {
        en: { images: [], title: "", description: "" },
        ro: { images: [], title: "", description: "" },
        ru: { images: [], title: "", description: "" },
    }
    const [newAllData, setNewAllData] = useState<INewAllData>(defaultNewAllData)
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)
    const [previewImages, setPreviewImages] = useState<IPreviewImage[]>([])
    const [isLoading, setIsLoading] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    function editImageChangeHandler(blob: any) {
        const url = URL.createObjectURL(blob)
        setPreviewImages(prev => [...prev, { blob, url }])
    }

    function deleteImageHandler(url: string) {
        const isPreviewImage = previewImages.filter(item => item.url === url).length > 0

        if (isPreviewImage) {
            setPreviewImages(prev => prev.filter(item => item.url !== url))
        }
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        setNewAllData(defaultNewAllData)
        setPreviewImages([])
    }

    async function saveClickHandler() {
        if (!data) return
        if (!isAllLanguagesFilledUp(newAllData)) {
            alert("You have to fill up all languages")
            return
        }

        setIsLoading(true)

        try {
            const uploadedImages: string[] = []
            if (previewImages.length > 0) {
                for (const img of previewImages) {
                    const rand = (Math.random() * 100000000).toFixed()
                    const url = await uploadImageToBucket(
                        img.blob,
                        `${DATA_BUCKET.services}/serv${rand}`
                    )
                    uploadedImages.push(url)
                }
            }

            const allServicesData = { ...data }
            const id = allServicesData[defaultLanguage].length
            for (const lang of allLanguages) {
                allServicesData[lang][id] = newAllData[lang]
                if (uploadedImages.length > 0) {
                    allServicesData[lang][id].images = uploadedImages
                }
                const objectData = reformatArrayToObject(allServicesData[lang])
                await updateSectionData(lang, "services", objectData)
            }

            alert("Success")
        } catch (error) {
            alert("Error")
        }

        setIsOpen(false)
        setIsLoading(false)
        setNewAllData(defaultNewAllData)
        setPreviewImages([])
        triggerRefetch?.()
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
                        <ImagesList
                            data={previewImages.map(item => item.url)}
                            onDelete={deleteImageHandler}
                        />
                        <EditImage onChange={editImageChangeHandler} />
                    </div>
                    <Input
                        label="Title"
                        value={newAllData[currentLanguage].title}
                        onChange={value =>
                            setNewAllData(prev => ({
                                ...prev,
                                [currentLanguage]: { ...prev[currentLanguage], title: value },
                            }))
                        }
                    />
                    <Textarea
                        className={styles.textarea}
                        label="Description"
                        value={newAllData[currentLanguage].description}
                        onChange={value =>
                            setNewAllData(prev => ({
                                ...prev,
                                [currentLanguage]: { ...prev[currentLanguage], description: value },
                            }))
                        }
                    />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Add New</button>
        </>
    )
}
