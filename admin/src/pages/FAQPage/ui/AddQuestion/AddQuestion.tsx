import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Textarea } from "shared/ui/Textarea/Textarea"
import { Dropdown } from "shared/ui/Dropdown"
import { LanguageType } from "shared/types/types"
import styles from "./AddQuestion.module.scss"
import { classNames } from "shared/lib/classNames/classNames"

export function AddQuestion({
    id,
    triggerRefetch,
    unselectAllHandler,
    className,
}: {
    id?: number
    triggerRefetch?: () => void
    unselectAllHandler?: () => void
    className?: string
}) {
    const [data, setData] = useState({ id: 0, question: "", answer: "" })
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
                    <Textarea
                        label="question"
                        onChange={value => setData(prev => ({ ...prev, question: value }))}
                    />
                    <Textarea
                        label="answer"
                        onChange={value => setData(prev => ({ ...prev, answer: value }))}
                    />
                </div>
            </ModalEditorWithTranslation>
            <button className={className} onClick={() => setIsOpen(true)}>
                add new question
            </button>
        </>
    )
}
