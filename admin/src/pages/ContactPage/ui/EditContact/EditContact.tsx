import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { LanguageType } from "shared/types/types"
import styles from "./EditContact.module.scss"
import { Input } from "shared/ui/Input/Input"

export function EditContact({ label, contact }: { label: string; contact: string }) {
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
            <ModalEditorWithTranslation
                isOpen={isOpen}
                onClose={onClose}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={() => null}
                onDiscardClick={() => null}
            >
                <div className={styles.container}>
                    <Input label={label} value={contact} onChange={value => setInfo(value)} />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
