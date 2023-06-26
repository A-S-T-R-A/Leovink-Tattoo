import { useEffect, useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import { LanguageType } from "shared/types/types"
import { IPreviewImage, IServiceData, ITranslatedServiceData } from "../../types/types"
import styles from "./EditParagraph.module.scss"
import { EditImage } from "features/editImage"
import { ImagesList } from "../ImagesList/ImagesList"
import { isDeepEqual } from "shared/lib/isDeepEqual/isDeepEqual"
import {
    DATA_BUCKET,
    deleteImageFromBucket,
    reformatArrayToObject,
    updateSectionData,
    uploadImageToBucket,
} from "shared/const/firebaseVariables"
import { findArraysDifference } from "shared/lib/findArrayDifference/findArrayDifference"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { Alert } from "shared/ui/CustomNotifications"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"

export function EditParagraph({
    id,
    data,
    triggerRefetch,
}: {
    data: ITranslatedServiceData | null
    id: number
    triggerRefetch?: () => void
}) {
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)
    const defaultNewData = { title: "", description: "", images: [] }
    const [newData, setNewData] = useState<IServiceData>(defaultNewData)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [previewImages, setPreviewImages] = useState<IPreviewImage[]>([])

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
        if (isDeepEqual(data?.[currentLanguage][id], newData) && previewImages.length === 0) {
            Alert.info("Nothing to save")
            setIsOpen(false)
            return
        }
        setIsLoading(true)

        const documentData = [...data[currentLanguage]]
        const dataToUpload = { ...newData }

        const imagesToDelete = findArraysDifference(documentData[id].images, newData.images)

        const isNewDataImagesChanged = imagesToDelete.length > 0
        const isPreviewImagesChanged = previewImages.length > 0
        try {
            if (isNewDataImagesChanged || isPreviewImagesChanged) {
                const uploadedImages: string[] = [...newData.images]
                if (isNewDataImagesChanged) {
                    for (const img of imagesToDelete) {
                        deleteImageFromBucket(img, DATA_BUCKET.services)
                    }
                }

                if (isPreviewImagesChanged) {
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

                for (const lang of allLanguages) {
                    if (lang === currentLanguage) {
                        dataToUpload.images = uploadedImages
                        allServicesData[lang][id] = dataToUpload
                    }
                    allServicesData[lang][id].images = uploadedImages
                    const objectData = reformatArrayToObject(allServicesData[lang])
                    await updateSectionData(lang, "services", objectData)
                }
            } else {
                documentData[id] = dataToUpload
                const objectData = reformatArrayToObject(documentData)
                await updateSectionData(currentLanguage, "services", objectData)
            }
            setIsLoading(false)
            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsOpen(false)
        setPreviewImages([])
        triggerRefetch?.()
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        refreshNewData()
    }

    function editImageChangeHandler(blob: any) {
        const url = URL.createObjectURL(blob)
        setPreviewImages(prev => [...prev, { blob, url }])
    }

    function deleteImageHandler(url: string) {
        const isPreviewImage = previewImages.filter(item => item.url === url).length > 0
        const isNewDataImage = newData.images.includes(url)

        if (isPreviewImage) {
            setPreviewImages(prev => prev.filter(item => item.url !== url))
        }

        if (isNewDataImage) {
            setNewData(prev => ({ ...prev, images: prev.images.filter(item => item !== url) }))
        }
    }

    const previewImagesUrl = previewImages.map(item => item.url)

    return (
        <>
            <LoadingModal isLoading={isLoading} />
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
                            data={[...newData.images, ...previewImagesUrl]}
                            onDelete={deleteImageHandler}
                        />
                        <EditImage onChange={editImageChangeHandler} />
                    </div>
                    <div>id: {id}</div>
                    <Input
                        label="Title"
                        value={newData.title}
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
