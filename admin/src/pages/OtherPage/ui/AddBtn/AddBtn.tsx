import { useState } from "react"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"
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
            <ModalEditor
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
            </ModalEditor>
            <button onClick={() => setIsOpen(true)}>add new</button>
        </>
    )
}
