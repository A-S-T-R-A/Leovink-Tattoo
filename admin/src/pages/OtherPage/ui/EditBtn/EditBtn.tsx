import { useState } from "react"
import { ModalEditor } from "shared/components/ModalEditor/ModalEditor"
import { LanguageType } from "shared/types/types"
import styles from "./EditBtn.module.scss"
import { Input } from "shared/ui/Input/Input"

export function EditBtn({ label, sectionName }: { label: string; sectionName: string }) {
    const [name, setName] = useState("")
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
                isOpen={isOpen}
                onClose={onClose}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={() => null}
                onDiscardClick={() => null}
            >
                <div className={styles.container}>
                    <Input label={label} value={sectionName} onChange={value => setName(value)} />
                </div>
            </ModalEditor>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
