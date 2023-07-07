import { useState } from "react"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"
import { LanguageType } from "shared/types/types"
import styles from "./EditDescription.module.scss"
import { Textarea } from "shared/ui/Textarea/Textarea"

export function EditDescription({ description }: { description: string }) {
    const [info, setInfo] = useState("")
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
            <ModalEditor
                withTranslation
                isOpen={isOpen}
                onClose={onClose}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={() => null}
                onDiscardClick={() => null}
            >
                <div className={styles.container}>
                    <Textarea
                        label="Description"
                        value={description}
                        onChange={value => setInfo(value)}
                    />
                </div>
            </ModalEditor>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
