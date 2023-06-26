import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import styles from "./AddReviewModal.module.scss"
import { LanguageType } from "shared/types/types"
import { INewAllData, ITranslatedTestimonialsData } from "../../types/types"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { defaultNewAllData, defaultPreviewAssets } from "../../const/const"
import { EditImage } from "features/editImage"
import { EditVideo } from "features/editVideo"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { isAllLanguagesFilledUp } from "../../lib/isAllLanguagesFilledUp"
import {
    DATA_BUCKET,
    reformatArrayToObject,
    updateSectionData,
    uploadImageToBucket,
} from "shared/const/firebaseVariables"
import { Alert } from "shared/ui/CustomNotifications"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"

export function AddReviewModal({
    data,
    triggerRefetch,
}: {
    data: ITranslatedTestimonialsData | null
    triggerRefetch?: () => void
}) {
    const [newAllData, setNewAllData] = useState<INewAllData>(defaultNewAllData)
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)
    const [previewAssets, setPreviewAssets] = useState(defaultPreviewAssets)
    const [isLoading, setIsLoading] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    function editImageChangeHandler(blob: any) {
        const url = URL.createObjectURL(blob)
        setPreviewAssets(prev => ({ ...prev, preview: { url, blob } }))
    }

    function editVideoChangeHandler(blob: any) {
        const url = URL.createObjectURL(blob)
        setPreviewAssets(prev => ({ ...prev, video: { url, blob } }))
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        setNewAllData(defaultNewAllData)
        setPreviewAssets(defaultPreviewAssets)
    }

    async function saveClickHandler() {
        if (!data) return
        if (!isAllLanguagesFilledUp(newAllData) && previewAssets.preview.url) {
            Alert.info("You have to fill up all languages and a preview")
            return
        }

        setIsLoading(true)

        try {
            let newPreview = ""
            let newVideo = ""

            if (previewAssets.preview.url !== "") {
                const rand = (Math.random() * 100000000).toFixed()
                newPreview = await uploadImageToBucket(
                    previewAssets.preview.blob,
                    `${DATA_BUCKET.testimonials}/preview${rand}`
                )
            }

            if (previewAssets.video.url !== "") {
                const rand = (Math.random() * 100000000).toFixed()
                newVideo = await uploadImageToBucket(
                    previewAssets.video.blob,
                    `${DATA_BUCKET.testimonials}/video${rand}`
                )
            }

            const allReviewsData = { ...data }
            const id = allReviewsData[defaultLanguage].length
            for (const lang of allLanguages) {
                allReviewsData[lang][id] = newAllData[lang]
                if (newPreview !== "") {
                    allReviewsData[lang][id].preview = newPreview
                }
                if (newVideo !== "") {
                    allReviewsData[lang][id].preview = newVideo
                }
                const objectData = reformatArrayToObject(allReviewsData[lang])
                await updateSectionData(lang, "testimonials", objectData)
            }

            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsOpen(false)
        setIsLoading(false)
        setNewAllData(defaultNewAllData)
        setPreviewAssets(defaultPreviewAssets)
        triggerRefetch?.()
    }

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
                        Preview img:
                        <ModalImage
                            url={previewAssets.preview.url || newAllData[currentLanguage].preview}
                            className={styles.img}
                        />
                        <EditImage onChange={editImageChangeHandler} />
                    </div>
                    <div className={styles.videoContainer}>
                        Video:
                        <video
                            src={previewAssets.video.url || newAllData[currentLanguage].video}
                            className={styles.video}
                        />
                        <EditVideo onChange={editVideoChangeHandler} />
                    </div>
                    <div>
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
                    </div>
                    <div>
                        <Textarea
                            className={styles.textarea}
                            label="Description"
                            value={newAllData[currentLanguage].description}
                            onChange={value =>
                                setNewAllData(prev => ({
                                    ...prev,
                                    [currentLanguage]: {
                                        ...prev[currentLanguage],
                                        description: value,
                                    },
                                }))
                            }
                        />
                    </div>
                    <div>
                        <Input
                            label="Tattoo Artist"
                            value={newAllData[currentLanguage].artist}
                            onChange={value =>
                                setNewAllData(prev => ({
                                    ...prev,
                                    [currentLanguage]: { ...prev[currentLanguage], artist: value },
                                }))
                            }
                        />
                    </div>
                    <div>
                        <Input
                            label="Duration"
                            value={newAllData[currentLanguage].duration}
                            onChange={value =>
                                setNewAllData(prev => ({
                                    ...prev,
                                    [currentLanguage]: {
                                        ...prev[currentLanguage],
                                        duration: value,
                                    },
                                }))
                            }
                        />
                    </div>
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Add New</button>
        </>
    )
}
