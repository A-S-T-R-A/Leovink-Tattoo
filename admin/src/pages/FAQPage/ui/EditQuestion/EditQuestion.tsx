import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Textarea } from "shared/ui/Textarea/Textarea"
import { Dropdown } from "shared/ui/Dropdown"
import { LanguageType } from "shared/types/types"
import styles from "./EditQuestion.module.scss"
import { IFaqData } from "pages/FAQPage/types/types"

export function EditQuestion({
    questionsData,
    id,
    triggerRefetch,
    unselectAllHandler,
}: {
    questionsData: { question: string; answer: string }[]
    id?: number
    triggerRefetch?: () => void
    unselectAllHandler?: () => void
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

    const dropdownNumbers = Array(questionsData.length)
        .fill("")
        .map((_, index) => {
            const v = (index + 1).toString()
            return { label: v, value: v }
        })

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
                    <div>
                        id:
                        <Dropdown
                            options={dropdownNumbers}
                            value={data.id?.toString()}
                            onChange={id => setData(prev => ({ ...prev, id: +id }))}
                        />
                    </div>
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
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
