import { useEffect, useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import { LanguageType } from "shared/types/types"
import styles from "./EditParagraph.module.scss"
import { IArtistData, ITranslatedArtistsData } from "../../types/types"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { defaultNewEditData, defaultPreviewImage } from "../../const/const"
import { IPreviewImage } from "../../types/types"
import { EditImage } from "features/editImage"
import { isDeepEqual } from "shared/lib/isDeepEqual/isDeepEqual"
import {
    DATA_BUCKET,
    deleteImageFromBucket,
    reformatArrayToObject,
    updateSectionData,
    uploadImageToBucket,
} from "shared/const/firebaseVariables"
import { isStringUrlFriendly } from "shared/lib/isStringUrlFriendly/isStringUrlFriendly"

export function EditParagraph({
    id,
    data,
    triggerRefetch,
}: {
    data: ITranslatedArtistsData | null
    id: number
    triggerRefetch?: () => void
}) {
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)
    const [newData, setNewData] = useState<IArtistData>(defaultNewEditData)
    const [isOpen, setIsOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState<IPreviewImage>(defaultPreviewImage)
    const [isLoading, setIsLoading] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    useEffect(() => {
        refreshNewData()
    }, [data, currentLanguage, id])

    function refreshNewData() {
        if (data) {
            setNewData(data[currentLanguage][id])
        }
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
        refreshNewData()
    }

    function editImageChangeHandler(blob: any) {
        const url = URL.createObjectURL(blob)
        setPreviewImage({ blob, url })
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        setPreviewImage(defaultPreviewImage)
        refreshNewData()
    }

    async function saveClickHandler() {
        if (!data) return
        if (isDeepEqual(data[currentLanguage][id], newData) && previewImage.url === "") {
            alert("Nothing to save")
            return
        }
        if (!isStringUrlFriendly(newData.slug)) {
            alert("Slug has to be URL friendly")
            return
        }

        setIsLoading(true)

        const documentData = [...data[currentLanguage]]
        const dataToUpload = { ...newData }

        try {
            if (previewImage.url !== "") {
                const rand = (Math.random() * 100000000).toFixed()
                const newImg = await uploadImageToBucket(
                    previewImage.blob,
                    `${DATA_BUCKET.artists}/a${rand}`
                )
                deleteImageFromBucket(newData.img, DATA_BUCKET.artists)

                const allArtistsData = { ...data }

                for (const lang of allLanguages) {
                    if (lang === currentLanguage) {
                        allArtistsData[lang][id] = dataToUpload
                    }
                    allArtistsData[lang][id].img = newImg
                    const objectData = reformatArrayToObject(allArtistsData[lang])
                    await updateSectionData(lang, "artists", objectData)
                }
            } else {
                documentData[id] = dataToUpload
                const objectData = reformatArrayToObject(documentData)
                await updateSectionData(currentLanguage, "artists", objectData)
            }

            alert("Success")
        } catch (error) {
            alert("Error")
        }

        setIsOpen(false)
        setIsLoading(false)
        setPreviewImage(defaultPreviewImage)
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
                        photo:
                        <ModalImage url={previewImage.url || newData.img} className={styles.img} />
                        <EditImage onChange={editImageChangeHandler} />
                    </div>
                    <div>id: {id}</div>
                    <div>
                        <Input
                            label="Name"
                            value={newData.name}
                            onChange={value => setNewData(prev => ({ ...prev, name: value }))}
                        />
                    </div>
                    <div>
                        <Input
                            label="Specialization"
                            value={newData.specialization}
                            onChange={value =>
                                setNewData(prev => ({ ...prev, specialization: value }))
                            }
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
                            label="Slug"
                            value={newData.slug}
                            onChange={value => setNewData(prev => ({ ...prev, slug: value }))}
                        />
                    </div>
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
