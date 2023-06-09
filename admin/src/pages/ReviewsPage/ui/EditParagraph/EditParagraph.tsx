import { useEffect, useState } from "react"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import { LanguageType } from "shared/types/types"
import styles from "./EditParagraph.module.scss"
import { ITestimonialData, ITranslatedTestimonialsData } from "../../types/types"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { EditImage } from "features/editImage"
import { EditVideo } from "features/editVideo"
import { isDeepEqual } from "shared/lib/isDeepEqual/isDeepEqual"
import {
    DATA_BUCKET,
    deleteImageFromBucket,
    reformatArrayToObject,
    updateSectionData,
    uploadImageToBucket,
} from "shared/const/firebaseVariables"
import { defaultNewData } from "../../const/const"
import { Alert } from "shared/ui/CustomNotifications"
import { LoadingModal } from "shared/components/LoadingModal/LoadingModal"
import { ModalVideo } from "shared/components/ModalVideo/ModalVideo"

export function EditParagraph({
    id,
    data,
    triggerRefetch,
}: {
    data: ITranslatedTestimonialsData | null
    id: number
    triggerRefetch?: () => void
}) {
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)
    const [newData, setNewData] = useState<ITestimonialData>(defaultNewData)
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const defaultPreviewAssets = {
        preview: { url: "", blob: "" },
        video: { url: "", blob: "" },
    }
    const [previewAssets, setPreviewAssets] = useState(defaultPreviewAssets)

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
        if (!data) return
        const isNewPreviewAsset = previewAssets.preview.url !== "" || previewAssets.video.url !== ""
        if (isDeepEqual(data?.[currentLanguage][id], newData) && !isNewPreviewAsset) {
            Alert.info("Nothing to save")
            return
        }
        setIsLoading(true)

        const documentData = [...data[currentLanguage]]
        const dataToUpload = { ...newData }

        try {
            if (isNewPreviewAsset) {
                let newPreview = ""
                let newVideo = ""

                if (previewAssets.preview.url !== "") {
                    const rand = (Math.random() * 100000000).toFixed()
                    newPreview = await uploadImageToBucket(
                        previewAssets.preview.blob,
                        `${DATA_BUCKET.testimonials}/preview${rand}`
                    )
                    deleteImageFromBucket(newData.preview, DATA_BUCKET.testimonials)
                }

                if (previewAssets.video.url !== "") {
                    const rand = (Math.random() * 100000000).toFixed()
                    newVideo = await uploadImageToBucket(
                        previewAssets.video.blob,
                        `${DATA_BUCKET.testimonials}/video${rand}`
                    )
                    deleteImageFromBucket(newData.video, DATA_BUCKET.testimonials)
                }

                const allServicesData = { ...data }

                for (const lang of allLanguages) {
                    if (lang === currentLanguage) {
                        if (newPreview !== "") dataToUpload.preview = newPreview
                        if (newVideo !== "") dataToUpload.video = newVideo
                        allServicesData[lang][id] = dataToUpload
                    }
                    if (newPreview !== "") allServicesData[lang][id].preview = newPreview
                    if (newVideo !== "") allServicesData[lang][id].video = newVideo
                    const objectData = reformatArrayToObject(allServicesData[lang])
                    await updateSectionData(lang, "testimonials", objectData)
                }
            } else {
                documentData[id] = dataToUpload
                const objectData = reformatArrayToObject(documentData)
                await updateSectionData(currentLanguage, "testimonials", objectData)
            }

            Alert.success("Success")
        } catch (error) {
            Alert.error("Error")
        }

        setIsOpen(false)
        setPreviewAssets(defaultPreviewAssets)
        triggerRefetch?.()
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        refreshNewData()
    }

    function editImageChangeHandler(blob: any) {
        const url = URL.createObjectURL(blob)
        setPreviewAssets(prev => ({ ...prev, preview: { url, blob } }))
    }

    function editVideoChangeHandler(blob: any) {
        const url = URL.createObjectURL(blob)
        setPreviewAssets(prev => ({ ...prev, video: { url, blob } }))
    }

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <ModalEditor
                withTranslation
                isOpen={isOpen}
                onClose={onClose}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                <div className={styles.container}>
                    <div className={styles.imgContainer}>
                        preview:
                        <ModalImage
                            url={previewAssets.preview.url || newData.preview}
                            className={styles.img}
                        />
                        <EditImage onChange={editImageChangeHandler} />
                    </div>
                    <div className={styles.videoContainer}>
                        Video:
                        <ModalVideo video={previewAssets.video.url || newData.video} />
                        <EditVideo onChange={editVideoChangeHandler} />
                    </div>
                    <div>id: {id}</div>
                    <div>
                        <Input
                            label="Title"
                            value={newData.title}
                            onChange={value => setNewData(prev => ({ ...prev, title: value }))}
                        />
                    </div>
                    <div>
                        <Textarea
                            className={styles.textarea}
                            label="Description"
                            value={newData.description}
                            onChange={value =>
                                setNewData(prev => ({ ...prev, description: value }))
                            }
                        />
                    </div>
                    <div>
                        <Input
                            label="Tattoo Artist"
                            value={newData.artist}
                            onChange={value => setNewData(prev => ({ ...prev, artist: value }))}
                        />
                    </div>
                    <div>
                        <Input
                            label="Duration"
                            value={newData.duration}
                            onChange={value => setNewData(prev => ({ ...prev, duration: value }))}
                        />
                    </div>
                </div>
            </ModalEditor>
            <button onClick={() => setIsOpen(true)} className={styles.btn}>
                Edit
            </button>
        </>
    )
}
