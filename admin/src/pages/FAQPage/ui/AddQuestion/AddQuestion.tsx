import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Textarea } from "shared/ui/Textarea/Textarea"
import { LanguageType } from "shared/types/types"
import styles from "./AddQuestion.module.scss"

export function AddQuestion({ className }: { className?: string }) {
    const [question, setQuestion] = useState({ question: "", answer: "" })
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
                        value={question.question}
                        onChange={value => setQuestion(prev => ({ ...prev, question: value }))}
                    />
                    <Textarea
                        label="answer"
                        value={question.answer}
                        onChange={value => setQuestion(prev => ({ ...prev, answer: value }))}
                    />
                </div>
            </ModalEditorWithTranslation>
            <button className={className} onClick={() => setIsOpen(true)}>
                add new question
            </button>
        </>
    )
}
