import { Languages } from "shared/components/Languages/Languages"
import { ReactNode } from "react"
import { LanguageType } from "shared/types/types"
import { Modal } from "shared/ui/Modal"
import styles from "./ModalEditorWithTranslation.module.scss"

interface IModalEditorWithTranslation {
    children: ReactNode
    isOpen: boolean
    currentLanguage: LanguageType
    onClose: () => void
    onChangeLanguage: (language: LanguageType) => void
    onSaveClick: () => void
    onDiscardClick: () => void
}

export function ModalEditorWithTranslation(props: IModalEditorWithTranslation) {
    const {
        children,
        isOpen,
        onClose,
        onChangeLanguage,
        currentLanguage,
        onSaveClick,
        onDiscardClick,
    } = props

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Languages currentLanguage={currentLanguage} onChangeLanguage={onChangeLanguage} />
            {children}
            <div className={styles.btnContainer}>
                <button onClick={onSaveClick}>save</button>
                <button onClick={onDiscardClick}>discard</button>
            </div>
        </Modal>
    )
}
