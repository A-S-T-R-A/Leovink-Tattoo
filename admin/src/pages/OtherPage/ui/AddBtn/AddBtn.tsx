import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { LanguageType } from "shared/types/types"
import styles from "./AddBtn.module.scss"
import { Input } from "shared/ui/Input/Input"
import { defaultLanguage } from "shared/const/languages"

export function AddBtn({ label }: { label: string }) {
    const [name, setName] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)

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
                    <Input label={label} value={name} onChange={value => setName(value)} />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>add new</button>
        </>
    )
}
