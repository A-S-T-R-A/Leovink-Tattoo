import { useState } from "react"
import { ModalEditorWithTranslation } from "shared/components/ModalEditorWithTranslation/ModalEditorWithTranslation"
import { LanguageType } from "shared/types/types"
import styles from "./EditFaqTitle.module.scss"
import { IFaqData } from "../../types/types"
import { Input } from "shared/ui/Input/Input"
import { defaultLanguage } from "shared/const/languages"

export function EditFaqTitle({ data, id }: { data: IFaqData; id?: number }) {
    const defaultNewTitle = data.title || ""
    const [newTitle, setNewTitle] = useState(defaultNewTitle)
    const [isOpen, setIsOpen] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(defaultLanguage)

    function onClose() {
        setIsOpen(false)
    }

    function onChangeLanguage(lang: LanguageType) {
        setCurrentLanguage(lang)
    }

    function discardClickHandler() {
        setIsOpen(false)
        setIsLoading(false)
        setNewData(defaultNewData)
    }

    return (
        <>
            <ModalEditorWithTranslation
                isOpen={isOpen}
                onClose={onClose}
                onChangeLanguage={onChangeLanguage}
                currentLanguage={currentLanguage}
                onSaveClick={() => null}
                onDiscardClick={discardClickHandler}
            >
                <div className={styles.container}>
                    <div>id: {id}</div>
                    <Input label="Title" value={newTitle} onChange={value => setNewTitle(value)} />
                </div>
            </ModalEditorWithTranslation>
            <button onClick={() => setIsOpen(true)}>Edit</button>
        </>
    )
}
