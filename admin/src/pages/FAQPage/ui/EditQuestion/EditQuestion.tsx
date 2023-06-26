import { useEffect, useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Textarea } from "shared/ui/Textarea/Textarea"
import { Dropdown } from "shared/ui/Dropdown"
import { LanguageType } from "shared/types/types"
import styles from "./EditQuestion.module.scss"
import { ITranslatedFaqData } from "../../types/types"
import { defaultLanguage } from "shared/const/languages"
import { isShallowEqual } from "shared/lib/isShallowEqual/isShallowEqual"
import { reformatArrayToObject, updateSectionData } from "shared/const/firebaseVariables"

export function EditQuestion({
    data,
    titleId,
    id,
    triggerRefetch,
}: {
    data: ITranslatedFaqData | null
    titleId: number
    id: number
    triggerRefetch: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)
    const defaultNewQuestion = { question: "", answer: "" }
    const [newQuestion, setNewQuestion] = useState(defaultNewQuestion)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        refreshNewData()
    }, [data, currentLanguage, id, titleId])

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    function refreshNewData() {
        if (data) {
            setNewQuestion(data[currentLanguage][titleId].questions[id])
        }
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        refreshNewData()
    }

    async function saveClickHandler() {
        if (!data) return
        if (isShallowEqual(data[currentLanguage][titleId].questions[id], newQuestion)) {
            alert("Nothing to save")
            return
        }

        setIsLoading(true)

        try {
            const documentData = [...data[currentLanguage]]
            documentData[titleId].questions[id] = newQuestion
            const objectData = reformatArrayToObject(documentData)
            await updateSectionData(currentLanguage, "faq", objectData)

            alert("Success")
        } catch (error) {
            alert("Error")
        }

        setIsLoading(false)
        setIsOpen(false)
        triggerRefetch?.()
    }

    return (
        <>
            <ModalEditorWithTranslation
                isOpen={isOpen}
                onClose={onClose}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={saveClickHandler}
                onDiscardClick={discardClickHandler}
            >
                <div className={styles.container}>
                    <div>id: {id}</div>
                    <Textarea
                        className={styles.textarea}
                        label="question"
                        value={newQuestion.question}
                        onChange={value => setNewQuestion(prev => ({ ...prev, question: value }))}
                    />
                    <Textarea
                        className={styles.textarea}
                        label="answer"
                        value={newQuestion.answer}
                        onChange={value => setNewQuestion(prev => ({ ...prev, answer: value }))}
                    />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
