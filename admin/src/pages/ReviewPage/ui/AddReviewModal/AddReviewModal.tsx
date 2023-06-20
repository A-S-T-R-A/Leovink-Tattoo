import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import styles from "./AddReviewModal.module.scss"
import { LanguageType } from "shared/types/types"
import { IReviewData } from "pages/ReviewPage/types/types"

export function AddReviewModal({ reviewData }: { reviewData: IReviewData[] }) {
    const [data, setData] = useState({
        preview: "",
        video: "",
        title: "",
        description: "",
        tattoo_artist: "",
        duration: "",
    })
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>("en")

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    const dropdownNumbers = Array(reviewData.length)
        .fill("")
        .map((_, index) => {
            const v = (index + 1).toString()
            return { label: v, value: v }
        })

    return (
        <>
            <ModalEditorWithTranslation
                isOpen={isOpen}
                onClose={onClose}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={() => null}
                onDiscardClick={() => null}
            >
                <div className={styles.container}>
                    <div className={styles.imgContainer}>
                        Preview img:
                        <label htmlFor="my-file" className={styles.fileLabel}>
                            add
                        </label>
                        <input type="file" id="my-file" className={styles.file} />
                    </div>
                    <div className={styles.videoContainer}>
                        Video:
                        <label htmlFor="my-file" className={styles.fileLabel}>
                            add
                        </label>
                        <input type="file" id="my-file" className={styles.file} />
                    </div>
                    <div>
                        <Input
                            label="Title"
                            value={data.title}
                            onChange={value => setData(prev => ({ ...prev, title: value }))}
                        />
                    </div>
                    <div>
                        <Textarea
                            label="Description"
                            onChange={value => setData(prev => ({ ...prev, description: value }))}
                        />
                    </div>
                    <div>
                        <Input
                            label="Tattoo Artist"
                            value={data.tattoo_artist}
                            onChange={value => setData(prev => ({ ...prev, tattoo_artist: value }))}
                        />
                    </div>
                    <div>
                        <Input
                            label="Duration"
                            value={data.duration}
                            onChange={value => setData(prev => ({ ...prev, duration: value }))}
                        />
                    </div>
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Add New</button>
        </>
    )
}
