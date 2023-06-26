import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import styles from "./AddArtistsModal.module.scss"
import { LanguageType } from "shared/types/types"
import { INewAllData, IPreviewImage, ITranslatedArtistsData } from "../../types/types"
import { defaultNewAllData, defaultPreviewImage } from "../../const/const"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { EditImage } from "features/editImage"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { isAllEntriesFilledUp } from "../../lib/isAllEntriesFilledUp"
import {
    DATA_BUCKET,
    deleteImageFromBucket,
    reformatArrayToObject,
    updateSectionData,
    uploadImageToBucket,
} from "shared/const/firebaseVariables"

export function AddArtistsModal({
    data,
    triggerRefetch,
}: {
    data: ITranslatedArtistsData | null
    triggerRefetch: () => void
}) {
    const [newAllData, setNewAllData] = useState<INewAllData>(defaultNewAllData)
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)
    const [previewImage, setPreviewImage] = useState<IPreviewImage>(defaultPreviewImage)
    const [isLoading, setIsLoading] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    function editImageChangeHandler(blob: any) {
        const url = URL.createObjectURL(blob)
        setPreviewImage({ blob, url })
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        setNewAllData(defaultNewAllData)
        setPreviewImage(defaultPreviewImage)
    }

    async function saveClickHandler() {
        if (!data) return
        if (!isAllEntriesFilledUp(newAllData) || previewImage.url === "") {
            alert("You have to fill up all languages and an image")
            return
        }

        setIsLoading(true)

        try {
            const rand = (Math.random() * 100000000).toFixed()
            const newImg = await uploadImageToBucket(
                previewImage.blob,
                `${DATA_BUCKET.artists}/a${rand}`
            )
            deleteImageFromBucket(newAllData[currentLanguage].img, DATA_BUCKET.artists)

            const allArtistsData = { ...data }
            const id = allArtistsData[defaultLanguage].length
            for (const lang of allLanguages) {
                allArtistsData[lang][id] = newAllData[lang]
                allArtistsData[lang][id].img = newImg

                const objectData = reformatArrayToObject(allArtistsData[lang])
                await updateSectionData(lang, "artists", objectData)
            }

            alert("Success")
        } catch (error) {
            alert("Error")
        }

        setIsOpen(false)
        setIsLoading(false)
        setNewAllData(defaultNewAllData)
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
                        Photo:
                        <ModalImage
                            url={previewImage.url || newAllData[currentLanguage].img}
                            className={styles.img}
                        />
                        <EditImage onChange={editImageChangeHandler} />
                    </div>
                    <div>
                        <Input
                            label="Name"
                            value={newAllData[currentLanguage].name}
                            onChange={value =>
                                setNewAllData(prev => ({
                                    ...prev,
                                    [currentLanguage]: { ...prev[currentLanguage], name: value },
                                }))
                            }
                        />
                    </div>
                    <div>
                        <Input
                            label="Specialization"
                            value={newAllData[currentLanguage].specialization}
                            onChange={value =>
                                setNewAllData(prev => ({
                                    ...prev,
                                    [currentLanguage]: {
                                        ...prev[currentLanguage],
                                        specialization: value,
                                    },
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
                            label="Slug"
                            value={newAllData[currentLanguage].slug}
                            onChange={value =>
                                setNewAllData(prev => ({
                                    ...prev,
                                    [currentLanguage]: { ...prev[currentLanguage], slug: value },
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
