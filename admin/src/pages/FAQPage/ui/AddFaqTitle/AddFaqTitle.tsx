import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import styles from "./AddFaqTitle.module.scss"
import { LanguageType } from "shared/types/types"
import { IFaqData } from "pages/FAQPage/types/types"

export function AddFaqTitle({ faqData }: { faqData: IFaqData[] }) {
    const [data, setData] = useState({ title: "" })
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
                    <Input
                        label="Title"
                        value={data.title}
                        onChange={value => setData(prev => ({ ...prev, title: value }))}
                    />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Add new title</button>
        </>
    )
}
