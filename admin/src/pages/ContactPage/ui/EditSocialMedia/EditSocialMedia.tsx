import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { Input } from "shared/ui/Input/Input"
import styles from "./EditSocialMedia.module.scss"
import { LanguageType } from "shared/types/types"
import { ISocialMedia } from "../../types/type"

export function EditSocialMedia({ social }: { social: ISocialMedia }) {
    const [data, setData] = useState<ISocialMedia>({ icon: "", link: "" })
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>("en")

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

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
                        <ModalImage url={social.icon} className={styles.img} />
                        <label htmlFor="my-file">Edit</label>
                        <input type="file" id="my-file" className={styles.file} />
                    </div>
                    <Input
                        label="link"
                        value={social.link}
                        onChange={value => setData(prev => ({ ...prev, link: value }))}
                    />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
