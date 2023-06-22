import { useState } from "react"
import { FilePond } from "react-filepond"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { Input } from "shared/ui/Input/Input"
import { Textarea } from "shared/ui/Textarea/Textarea"
import styles from "./AddFaqModal.module.scss"
import { Dropdown } from "shared/ui/Dropdown"
import { LanguageType } from "shared/types/types"
import { IFaqData } from "pages/FAQPage/types/types"

export function AddFaqModal({ faqData }: { faqData: IFaqData[] }) {
    const [data, setData] = useState({ title: "", questions: [{ question: "", answer: "" }] })
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
                    <Textarea
                        label="Question"
                        onChange={value =>
                            setData(prev => ({
                                ...prev,
                                questions: [{ ...prev.questions[0], question: value }],
                            }))
                        }
                    />
                    <Textarea
                        label="Answer"
                        onChange={value =>
                            setData(prev => ({
                                ...prev,
                                questions: [{ ...prev.questions[0], answer: value }],
                            }))
                        }
                    />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Add New</button>
        </>
    )
}
