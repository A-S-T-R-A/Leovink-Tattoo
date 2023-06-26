import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Textarea } from "shared/ui/Textarea/Textarea"
import { LanguageType } from "shared/types/types"
import styles from "./AddQuestion.module.scss"
import { INewAllQuestionData, ITranslatedFaqData } from "../../types/types"
import { defaultNewAllQuestionData } from "../../const/const"
import { allLanguages, defaultLanguage } from "shared/const/languages"
import { isAllEntriesFilledUp } from "../../lib/isAllEntriesFilledUp"
import { reformatArrayToObject, updateSectionData } from "shared/const/firebaseVariables"

export function AddQuestion({
    data,
    titleId,
    triggerRefetch,
}: {
    data: ITranslatedFaqData | null
    titleId: number
    triggerRefetch?: () => void
}) {
    const [newAllQuestionData, setNewAllQuestionData] =
        useState<INewAllQuestionData>(defaultNewAllQuestionData)
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)
    const [isLoading, setIsLoading] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        setNewAllQuestionData(defaultNewAllQuestionData)
    }

    async function saveClickHandler() {
        if (!data) return
        if (!isAllEntriesFilledUp(newAllQuestionData)) {
            alert("You have to fill up all languages")
            return
        }

        setIsLoading(true)

        try {
            const allFaqData = { ...data }
            const id = allFaqData[defaultLanguage][titleId].questions.length
            for (const lang of allLanguages) {
                allFaqData[lang][titleId].questions[id] = newAllQuestionData[lang]
                const objectData = reformatArrayToObject(allFaqData[lang])
                await updateSectionData(lang, "faq", objectData)
            }

            alert("Success")
        } catch (error) {
            alert("Error")
        }

        setIsOpen(false)
        setIsLoading(false)
        setNewAllQuestionData(defaultNewAllQuestionData)
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
                    <Textarea
                        className={styles.textarea}
                        label="question"
                        value={newAllQuestionData[currentLanguage].question}
                        onChange={value =>
                            setNewAllQuestionData(prev => ({
                                ...prev,
                                [currentLanguage]: { ...prev[currentLanguage], question: value },
                            }))
                        }
                    />
                    <Textarea
                        className={styles.textarea}
                        label="answer"
                        value={newAllQuestionData[currentLanguage].answer}
                        onChange={value =>
                            setNewAllQuestionData(prev => ({
                                ...prev,
                                [currentLanguage]: { ...prev[currentLanguage], answer: value },
                            }))
                        }
                    />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)} className={styles.btn}>
                add new question
            </button>
        </>
    )
}
