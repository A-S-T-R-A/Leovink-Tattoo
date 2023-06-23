import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { LanguageType } from "shared/types/types"
import styles from "./EditName.module.scss"
import { Dropdown } from "shared/ui/Dropdown"

export function ChangeDefaultLanguageBtn() {
    const [lang, setLang] = useState("en")
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>("en")

    const languages = [
        { label: "en", value: "en" },
        { label: "ru", value: "ru" },
        { label: "ro", value: "ro" },
    ]

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
                <div>
                    <Dropdown
                        label="Language"
                        options={languages}
                        value={lang}
                        onChange={language => setLang(language)}
                    />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
